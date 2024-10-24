import { NextRequest } from 'next/server';
import { prisma } from "../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest) => {
    try {
        const url = new URL(req.url);
        const login = url.pathname.split('/')[3];

        if (!login) {
            return new Response(JSON.stringify({ error: 'login is required' }), { status: 400 });
        }

        // Находим пользователя по логину
        const user = await prisma.user.findUnique({
            where: { login },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Ищем запись в таблице referrals по userId
        const referralRecord = await prisma.referrals.findFirst({
            where: { userId: user.id },
        });

        let referredByLogin = 'Unknown'; // По умолчанию пригласивший неизвестен

        if (referralRecord && referralRecord.referredBy) {
            // Находим пригласившего пользователя по referredBy
            const referredByUser = await prisma.user.findUnique({
                where: { id: referralRecord.referredBy },
            });
            referredByLogin = referredByUser?.login || 'Unknown';
        }

        // Получаем список рефералов этого пользователя
        const referrals = await prisma.referrals.findMany({
            where: {
                referredBy: user.id,
            },
        });

        // Маппим данные о рефералах
        const referralLogins = await Promise.all(
            referrals.map(async (referral) => {
                const referredUser = await prisma.user.findUnique({
                    where: { id: referral.userId },
                });
                return {
                    login: referredUser?.login || 'Unknown',
                    line: `Линия ${referral.typeofline}`,
                    depositSum: `$${referral.totalProfit.toFixed(2)}`,
                };
            })
        );

        return new Response(
            JSON.stringify({
                email: user.email,
                password: user.password,
                referredBy: referredByLogin, // Добавляем логин пригласившего
                referrals: referralLogins,
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching referrals data:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};
