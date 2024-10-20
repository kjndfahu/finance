import { prisma } from "../../../../prisma/prisma-client";

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const login = searchParams.get('login'); // Получаем логин

        if (!login) {
            return new Response(JSON.stringify({ error: 'login is required' }), { status: 400 });
        }

        // Найти пользователя по логину
        const user = await prisma.user.findUnique({
            where: { login }, // Используем логин для поиска
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Ищем рефералов по userId
        const referrals = await prisma.referrals.findMany({
            where: {
                referredBy: user.id,
                typeofline: {
                    not: 0,  // Исключаем записи с typeofline = 0
                },
            },
        });

        // Получаем логины рефералов
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

        return new Response(JSON.stringify({ email: user.email, referrals: referralLogins }), { status: 200 });
    } catch (error) {
        console.error('Error fetching referrals data:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};
