import { NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    let login = searchParams.get('login');

    if (!login) {
        return NextResponse.json({ message: 'Логин не предоставлен' }, { status: 400 });
    }

    login = login.trim();

    console.log('Запрашиваемый логин:', login);

    try {
        const deposits = await prisma.deposits.findMany({
            where: { login: login },
            select: {
                id: true,
                depositSum: true,
                earning: true,
                percent: true,
                withdrawSum: true,
                endDate: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        console.log(deposits);

        return NextResponse.json(deposits, { status: 200 });
    } catch (error) {
        console.error('Ошибка при получении депозитов:', error);
        return NextResponse.json({ message: 'Ошибка сервера при получении депозитов' }, { status: 500 });
    }
};
