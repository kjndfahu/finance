import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma-client';

export async function POST(req: NextRequest) {
    try {
        // Извлекаем тело запроса
        const body = await req.json();
        const email = body.email;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required.' },
                { status: 400 }
            );
        }

        // Ищем пользователя по email
        const user = await prisma.user.findUnique({
            where: {
                email,
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
