import { prisma } from "../prisma/prisma-client";

export async function handleReferralBonus(newUserId: number, referredById: number) {
    const firstLevelUser = await prisma.user.findUnique({
        where: { id: referredById },
    });

    if (!firstLevelUser) return;

    const depositAmount = 1000;

    const firstLevelBonus = 0.08;
    await prisma.user.update({
        where: { id: firstLevelUser.id },
        data: {
            balance: {
                increment: depositAmount * firstLevelBonus,
            },
        },
    });

    const secondLevelReferral = await prisma.referrals.findFirst({
        where: { userId: firstLevelUser.id },
    });

    if (secondLevelReferral) {
        const secondLevelUser = await prisma.user.findUnique({
            where: { id: secondLevelReferral.referredBy },
        });

        if (secondLevelUser) {
            const secondLevelBonus = 0.05;

            await prisma.user.update({
                where: { id: secondLevelUser.id },
                data: {
                    balance: {
                        increment: depositAmount * secondLevelBonus,
                    },
                },
            });

            const thirdLevelReferral = await prisma.referrals.findFirst({
                where: { userId: secondLevelUser.id },
            });

            if (thirdLevelReferral) {
                const thirdLevelUser = await prisma.user.findUnique({
                    where: { id: thirdLevelReferral.referredBy },
                });

                if (thirdLevelUser) {
                    const thirdLevelBonus = 0.03;

                    await prisma.user.update({
                        where: { id: thirdLevelUser.id },
                        data: {
                            balance: {
                                increment: depositAmount * thirdLevelBonus,
                            },
                        },
                    });
                }
            }
        }
    }
}
