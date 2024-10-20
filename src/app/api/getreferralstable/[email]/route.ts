import { NextRequest, NextResponse } from 'next/server';
import {prisma} from "../../../../../prisma/prisma-client";

export const GET = async (req: NextRequest, { params }: { params: { email: string } }) => {
    try {
        const { email } = params; // Получаем email из параметров маршрута

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
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

        return NextResponse.json(referralLogins, { status: 200 });
    } catch (error) {
        console.error('Error fetching referrals data:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};
