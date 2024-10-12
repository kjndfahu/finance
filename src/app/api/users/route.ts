import {NextRequest, NextResponse} from "next/server";
import {hash} from "bcrypt";
import {z} from "zod";
import {prisma} from "../../../../prisma/prisma-client";
import {formLoginSchema, passwordSchema} from "../../../../components/lk/schema";
import {generateReferralCode} from "../../../../utils/generateReferralCode";


const formRegisterSchema = formLoginSchema
    .merge(
        z.object({
            login: z.string().min(2, {message: 'Введите корректно логин'}),
            name: z.string().min(2, {message: 'Введите корректно имя'}),
            surname: z.string().min(2, {message: 'Введите корректно фамилию'}),
            confirmPassword: passwordSchema,
            phoneNumber: z.string().min(10, {message: 'Введите корректно номер телеона'}),
            region: z.number().min(1, {message: 'Введите корректно номер региона'}),
            telegramId: z.string().min(3, {message: 'Введите корректно телеграм айди'}),

        })
    )
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export async function POST(req:NextRequest){
    try{
        const body = await req.json()
        const {login, name, surname, email, telegramId, phoneNumber, region, password} = formRegisterSchema.parse(body)
        const existingUserByEmail = await prisma.user.findUnique({
            where: {email: email}
        })
        if(existingUserByEmail){
            return NextResponse.json({user: null, message: "User ... "}, {status:409})
        }
        const existingUserByLogin = await prisma.user.findUnique({
            where: {login: login}
        })
        if(existingUserByLogin){
            return NextResponse.json({user: null, message: "login ... "}, {status:409})
        }
        let referralCode = generateReferralCode();
        let isUnique = false;

        while (!isUnique) {
            const existingReferral = await prisma.user.findUnique({
                where: {referralCode}
            });

            if (!existingReferral) {
                isUnique = true;
            } else {
                referralCode = generateReferralCode();
            }
        }
        const hashedPassword = await hash(password, 10)
        console.log(referralCode)
        const newUser = await prisma.user.create({
            data: {
                login,
                name,
                surname,
                email,
                telegramId,
                phoneNumber,
                region,
                password: hashedPassword,
                referralCode,

            }
        })

        const {password: newUserPassword, ...rest} = newUser

        console.log(newUser)

        return NextResponse.json({user: rest})
    } catch(err){
        return NextResponse.json({err, message: "Error ... "}, {status:409})
    }
}

export async function GET(){
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}
