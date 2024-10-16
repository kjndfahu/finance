import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcrypt";
import { z } from "zod";
import { prisma } from "../../../../prisma/prisma-client";
import { formLoginSchema, passwordSchema } from "../../../../components/lk/schema";
import { generateReferralCode } from "../../../../utils/generateReferralCode";

const formRegisterSchema = formLoginSchema
    .merge(
        z.object({
            login: z.string().min(2, { message: 'Введите корректно логин' }),
            name: z.string().min(2, { message: 'Введите корректно имя' }),
            surname: z.string().min(2, { message: 'Введите корректно фамилию' }),
            confirmPassword: passwordSchema,
            phoneNumber: z.string().min(10, { message: 'Введите корректно номер телефона' }),
            region: z.number().min(1, { message: 'Введите корректно номер региона' }),
            telegramId: z.string().min(3, { message: 'Введите корректно телеграм айди' }),
            referralCode: z.string()
        })
    )
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    });

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { login, name, surname, email, telegramId, phoneNumber, region, password, referralCode } = formRegisterSchema.parse(body);

        const existingUserByEmail = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Email уже занят" }, { status: 409 });
        }

        const existingUserByLogin = await prisma.user.findUnique({
            where: { login }
        });
        if (existingUserByLogin) {
            return NextResponse.json({ user: null, message: "Логин уже занят" }, { status: 409 });
        }

        let referralCodeToUse = generateReferralCode();
        let isUnique = false;

        while (!isUnique) {
            const existingReferral = await prisma.user.findUnique({
                where: { referralCode: referralCodeToUse }
            });

            if (!existingReferral) {
                isUnique = true;
            } else {
                referralCodeToUse = generateReferralCode();
            }
        }

        const hashedPassword = await hash(password, 10);


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
                referralCode: referralCodeToUse,
            }
        });

        if (referralCode) {
            console.log("Referral Code:", referralCode); // Отладочная информация

            const referrer = await prisma.user.findUnique({
                where: { referralCode }
            });

            if (referrer) {
                await prisma.referrals.create({
                    data: {
                        userId: newUser.id,
                        referredBy:referrer.id ,
                        totalReferrals: 1,
                    }
                });
            } else {
                console.log("Referrer not found for code:", referralCode); // Отладочная информация
                return NextResponse.json({ user: null, message: "Неверный реферальный код" }, { status: 409 });
            }
        }


        const { password: newUserPassword, ...rest } = newUser;
        return NextResponse.json({ user: rest });
    } catch (err) {
        return NextResponse.json({ err, message: "Ошибка при регистрации" }, { status: 409 });
    }
}

export async function GET(){
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}
