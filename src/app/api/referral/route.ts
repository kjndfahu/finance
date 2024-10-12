import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';
import { getServerSession } from 'next-auth'; // Функция для получения сессии

export async function GET(req: NextRequest) {
    try {
        // Получаем сессию
        const session = await getServerSession(req);

        if (!session || !session.user || !session.user.name) {
            return NextResponse.json(
                { error: 'User is not authenticated or telegramId is missing.' },
                { status: 401 }
            );
        }

        // Ищем пользователя по telegramId из сессии
        const user = await prisma.user.findUnique({
            where: {
                login: session.user.name,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found.' }, { status: 404 });
        }

        // Возвращаем реферальный код пользователя
        return NextResponse.json({ referralCode: user.referralCode });
    } catch (err) {
        console.error('Error fetching referral code:', err);
        return NextResponse.json(
            { error: 'Failed to fetch referral code.' },
            { status: 500 }
        );
    }
}