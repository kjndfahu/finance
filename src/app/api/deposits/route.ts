import { NextResponse } from 'next/server';
import {prisma} from "../../../../prisma/prisma-client";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            login,
            balance,
            depositSum,
            earning,
            percent,
            withdrawSum,
            endDate,
            status,
        } = body;

        // Проверяем, существует ли пользователь с указанными login и balance
        let user = await prisma.user.findUnique({
            where: {
                login_balance: {
                    login,
                    balance,
                },
            },
        });

        // Если пользователь не существует, создаем его (это по необходимости, если создание новых пользователей возможно)
        if (!user) {
            user = await prisma.user.create({
                data: {
                    login,
                    balance,
                    // Добавьте другие обязательные поля для модели User
                },
            });
        }


        const newDeposit = await prisma.deposits.create({
            data: {
                depositSum,
                earning,
                percent,
                withdrawSum,
                endDate: new Date(endDate), // Преобразуем строку в Date объект
                status,
                user: {
                    connect: {
                        login_balance: {
                            login: login,
                            balance: balance,
                        },
                    },
                },
            },
        });

        return NextResponse.json(newDeposit, { status: 201 });
    } catch (error) {
        console.error('Error creating deposit:', error);
        return NextResponse.json({ error: 'Failed to create deposit' }, { status: 500 });
    }
}

export async function GET(){
    const deposits = await prisma.deposits.findMany();
    return NextResponse.json(deposits);
}
