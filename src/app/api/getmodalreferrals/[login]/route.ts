import { NextRequest } from 'next/server';
import { prisma } from "../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest) => {
    try {
        const url = new URL(req.url);
        const login = url.pathname.split('/')[3];

        if (!login) {
            return new Response(JSON.stringify({ error: 'login is required' }), { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { login },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const referrals = await prisma.referrals.findMany({
            where: {
                referredBy: user.id,
                typeofline: {
                    not: 0,
                },
            },
        });

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

        return new Response(JSON.stringify({ email: user.email, password: user.password, referrals: referralLogins }), { status: 200 });
    } catch (error) {
        console.error('Error fetching referrals data:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};
