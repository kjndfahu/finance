import { NextRequest, NextResponse } from "next/server";

import { z } from "zod";
import { prisma } from "../../../../prisma/prisma-client";
import { formLoginSchema, passwordSchema } from "../../../../components/lk/schema";
import { generateReferralCode } from "../../../../utils/generateReferralCode";
import {handleReferralBonus} from "../../../../utils/referral";

const formRegisterSchema = formLoginSchema
    .merge(
        z.object({
            login: z.string().min(2, { message: 'Введите корректно логин' }),
            name: z.string().min(2, { message: 'Введите корректно имя' }),
            surname: z.string().min(2, { message: 'Введите корректно фамилию' }),
            confirmPassword: passwordSchema,
            phoneNumber: z.string().min(10, { message: 'Введите корректно номер телефона' }),
            region: z.string().min(1, { message: 'Введите корректно номер региона' }),
            telegramId: z.string().min(3, { message: 'Введите корректно телеграм айди' }),
            referralCode: z.string().optional() // реферальный код является опциональным
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

        // Проверка на наличие email в базе
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUserByEmail) {
            return NextResponse.json({ user: null, message: "Email уже занят" }, { status: 406 });
        }

        // Проверка на наличие логина в базе
        const existingUserByLogin = await prisma.user.findUnique({
            where: { login }
        });
        if (existingUserByLogin) {
            return NextResponse.json({ user: null, message: "Логин уже занят" }, { status: 405 });
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

        const newUser = await prisma.user.create({
            data: {
                login,
                name,
                surname,
                email,
                telegramId,
                phoneNumber,
                region,
                password: password,
                referralCode: referralCodeToUse,
            }
        });

        if (referralCode) {
            console.log("Referral Code:", referralCode);

            const referrer = await prisma.user.findUnique({
                where: { referralCode }
            });

            if (referrer) {
                await prisma.referrals.create({
                    data: {
                        userId: newUser.id,
                        referredBy: referrer.id,
                        totalReferrals: 1,
                        typeofline: 0,
                    }
                });

            } else {
                console.log("Referrer not found for code:", referralCode);
                return NextResponse.json({ user: null, message: "Неверный реферальный код" }, { status: 419 });
            }
        }

        const { password: newUserPassword, ...rest } = newUser;
        return NextResponse.json({ user: rest });
    } catch (err) {
        return NextResponse.json({ err, message: "Ошибка при регистрации" }, { status: 404 });
    }
}

export async function GET() {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}
