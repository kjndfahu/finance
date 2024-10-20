import {prisma} from "../../../../../prisma/prisma-client";


export const GET = async (req: Request, { params }: { params: { email: string } }) => {
    try {
        const email = params.email;

        if (!email) {
            return new Response(JSON.stringify({ error: 'email is required' }), { status: 400 });
        }

        // Найти userId по email
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        // Ищем рефералов по userId
        const referrals = await prisma.referrals.findMany({
            where: {
                referredBy: user.id,
            },
        });

        const totalReferrals = referrals.reduce((sum, referral) => sum + referral.totalReferrals, 0);
        const totalAmount = referrals.reduce((sum, referral) => sum + referral.totalAmount, 0);
        const totalProfit = referrals.reduce((sum, referral) => sum + referral.totalProfit, 0);

        return new Response(JSON.stringify({ totalReferrals, totalAmount, totalProfit }), { status: 200 });
    } catch (error) {
        console.error('Error fetching referrals data:', error);
        return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
};
