import { NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';

export async function POST(req: Request) {
    const { sum, email, requestId } = await req.json();

    if (!sum || !email || !requestId) {
        return NextResponse.json({ error: 'Missing sum, email, or requestId' }, { status: 400 });
    }

    try {
        console.log('Received request:', { sum, email, requestId });

        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            console.error(`User not found for email: ${email}`);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        console.log('User found:', user);

        const topUpOperation = await prisma.topUpOperations.create({
            data: {
                sum: parseInt(sum),
                email: user.email,
            },
        });

        console.log('Top-up operation created:', topUpOperation);

        const updatedUser = await prisma.user.update({
            where: { email: user.email },
            data: {
                balance: user.balance + parseInt(sum),
            },
        });

        console.log('User balance updated:', updatedUser);

        const referral = await prisma.referrals.findFirst({
            where: { userId: user.id },
        });

        console.log('Referral data:', referral);

        if (referral) {
            const firstLevelUser = await prisma.user.findFirst({
                where: { id: referral.referredBy },
            });

            console.log('First level user:', firstLevelUser);

            if (firstLevelUser) {
                const firstLevelBonus = sum * 0.08;

                await prisma.user.update({
                    where: { id: firstLevelUser.id },
                    data: {
                        balance: {
                            increment: firstLevelBonus,
                        },
                    },
                });

                console.log(`First-level referral bonus of ${firstLevelBonus} credited`);

                const existingFirstLevelReferral = await prisma.referrals.findFirst({
                    where: { userId: firstLevelUser.id, typeofline: 1 },
                });

                if (existingFirstLevelReferral) {
                    await prisma.referrals.create({
                        data: {
                            userId: user.id,
                            totalAmount: firstLevelBonus,
                            totalReferrals: 0,
                            totalProfit: sum,
                            typeofline: 1,
                            referredBy: referral.referredBy,
                        },
                    });
                } else {
                    await prisma.referrals.create({
                        data: {
                            userId: user.id,
                            totalAmount: firstLevelBonus,
                            totalReferrals: 0,
                            totalProfit: sum,
                            typeofline: 1,
                            referredBy: referral.referredBy,
                        },
                    });
                }

                const secondLevelReferral = await prisma.referrals.findFirst({
                    where: { userId: firstLevelUser.id },
                });

                console.log('Second level referral:', secondLevelReferral);

                if (secondLevelReferral) {
                    const secondLevelUser = await prisma.user.findFirst({
                        where: { id: secondLevelReferral.referredBy },
                    });

                    console.log('Second level user:', secondLevelUser);

                    if (secondLevelUser) {
                        const secondLevelBonus = sum * 0.06;

                        await prisma.user.update({
                            where: { id: secondLevelUser.id },
                            data: {
                                balance: {
                                    increment: secondLevelBonus,
                                },
                            },
                        });

                        console.log(`Second-level referral bonus of ${secondLevelBonus} credited`);

                        const existingSecondLevelReferral = await prisma.referrals.findFirst({
                            where: { userId: secondLevelUser.id, typeofline: 2 },
                        });

                        if (existingSecondLevelReferral) {
                            await prisma.referrals.create({
                                data: {
                                    userId: user.id,
                                    totalAmount: secondLevelBonus,
                                    totalReferrals: 0,
                                    totalProfit: sum,
                                    typeofline: 2,
                                    referredBy: secondLevelReferral.referredBy,
                                },
                            });
                        } else {
                            await prisma.referrals.create({
                                data: {
                                    userId: user.id,
                                    totalAmount: secondLevelBonus,
                                    totalReferrals: 0,
                                    totalProfit: sum,
                                    typeofline: 2,
                                    referredBy: secondLevelReferral.referredBy,
                                },
                            });
                        }

                        const thirdLevelReferral = await prisma.referrals.findFirst({
                            where: { userId: secondLevelUser.id },
                        });

                        console.log('Third level referral:', thirdLevelReferral);

                        if (thirdLevelReferral) {
                            const thirdLevelUser = await prisma.user.findFirst({
                                where: { id: thirdLevelReferral.referredBy },
                            });

                            console.log('Third level user:', thirdLevelUser);

                            if (thirdLevelUser) {
                                const thirdLevelBonus = sum * 0.03;

                                await prisma.user.update({
                                    where: { id: thirdLevelUser.id },
                                    data: {
                                        balance: {
                                            increment: thirdLevelBonus,
                                        },
                                    },
                                });

                                console.log(`Third-level referral bonus of ${thirdLevelBonus} credited`);

                                const existingThirdLevelReferral = await prisma.referrals.findFirst({
                                    where: { userId: thirdLevelUser.id, typeofline: 3 },
                                });

                                if (existingThirdLevelReferral) {
                                    await prisma.referrals.create({
                                        data: {
                                            userId: user.id,
                                            totalAmount: thirdLevelBonus,
                                            totalReferrals: 0,
                                            totalProfit: sum,
                                            typeofline: 3,
                                            referredBy: thirdLevelReferral.referredBy,
                                        },
                                    });
                                } else {
                                    await prisma.referrals.create({
                                        data: {
                                            userId: user.id,
                                            totalAmount: thirdLevelBonus,
                                            totalReferrals: 0,
                                            totalProfit: sum,
                                            typeofline: 3,
                                            referredBy: thirdLevelReferral.referredBy,
                                        },
                                    });
                                }

                            } else {
                                console.warn(`Third level user not found for referral ID: ${thirdLevelReferral.referredBy}`);
                            }
                        } else {
                            console.warn(`No third level referral found for user ID: ${secondLevelUser.id}`);
                        }
                    } else {
                        console.warn(`Second level user not found for referral ID: ${secondLevelReferral.referredBy}`);
                    }
                } else {
                    console.warn(`No second level referral found for user ID: ${firstLevelUser.id}`);
                }
            } else {
                console.warn(`First level user not found for referral ID: ${referral.referredBy}`);
            }
        } else {
            console.log(`No referral found for user ${email}`);
        }

        // Проверка на наличие запроса перед удалением
        const topUpRequest = await prisma.topUpRequest.findFirst({
            where: { id: requestId },
        });

        console.log('Top-up request:', topUpRequest);

        if (!topUpRequest) {
            console.error(`Top-up request not found for ID: ${requestId}`);
            return NextResponse.json({ error: 'Top-up request not found' }, { status: 404 });
        }

        // Удаление запроса на пополнение
        await prisma.topUpRequest.delete({
            where: { id: requestId },
        });

        console.log('Top-up request deleted successfully');

        return NextResponse.json({
            message: 'Top-up approved and balance updated successfully',
            topUpOperation,
            updatedUser,
        }, { status: 200 });
    } catch (error) {
        console.error('Error approving top-up request:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
