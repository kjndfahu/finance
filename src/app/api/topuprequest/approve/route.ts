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

        // Обновляем линию 0 на линию 1, если такая существует
        const zeroLineReferral = await prisma.referrals.findFirst({
            where: { userId: user.id, typeofline: 0 },
        });

        if (zeroLineReferral) {
            await prisma.referrals.updateMany({
                where: { userId: user.id, typeofline: 0 },
                data: { typeofline: 1 },
            });
            console.log('Zero-level referral(s) updated to first level.');
        }

        // Создание операции пополнения
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

        // Проверка на наличие реферальной записи
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

                // Проверяем и обновляем данные для первой линии
                const existingFirstLevelReferral = await prisma.referrals.findFirst({
                    where: { userId: user.id, typeofline: 1 },
                });

                if (existingFirstLevelReferral) {
                    await prisma.referrals.update({
                        where: { id: existingFirstLevelReferral.id },
                        data: {
                            totalProfit: existingFirstLevelReferral.totalProfit + sum,
                            totalAmount: existingFirstLevelReferral.totalAmount + firstLevelBonus,
                            totalReferrals: 1,
                        },
                    });
                    console.log(`First-level referral totalProfit updated by ${sum} and totalAmount updated by ${firstLevelBonus}`);

                    // Обновляем баланс пригласившего пользователя (первого уровня)
                    await prisma.user.update({
                        where: { id: firstLevelUser.id },
                        data: {
                            balance: firstLevelUser.balance + firstLevelBonus,
                        },
                    });
                    console.log(`First level user balance updated with first level bonus: ${firstLevelBonus}`);
                } else {
                    await prisma.referrals.create({
                        data: {
                            userId: user.id,
                            totalAmount: firstLevelBonus,
                            totalReferrals: 1,
                            totalProfit: sum,
                            typeofline: 1,
                            referredBy: referral.referredBy,
                        },
                    });
                    console.log(`New first-level referral created with totalProfit ${sum} and totalAmount ${firstLevelBonus}`);

                    await prisma.user.update({
                        where: { id: firstLevelUser.id },
                        data: {
                            balance: firstLevelUser.balance + firstLevelBonus,
                        },
                    });
                    console.log(`First level user balance updated with first level bonus: ${firstLevelBonus}`);
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
                        const secondLevelBonus = sum * 0.05;

                        // Проверяем и обновляем данные для второй линии
                        const existingSecondLevelReferral = await prisma.referrals.findFirst({
                            where: { userId: user.id, typeofline: 2 },
                        });

                        if (existingSecondLevelReferral) {
                            await prisma.referrals.update({
                                where: { id: existingSecondLevelReferral.id },
                                data: {
                                    totalProfit: existingSecondLevelReferral.totalProfit + sum,
                                    totalAmount: existingSecondLevelReferral.totalAmount + secondLevelBonus,
                                },
                            });
                            console.log(`Second-level referral totalProfit updated by ${sum} and totalAmount updated by ${secondLevelBonus}`);

                            // Обновляем баланс пригласившего пользователя (второго уровня)
                            await prisma.user.update({
                                where: { id: secondLevelUser.id },
                                data: {
                                    balance: secondLevelUser.balance + secondLevelBonus,
                                },
                            });
                            console.log(`Second level user balance updated with second level bonus: ${secondLevelBonus}`);
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
                            console.log(`New second-level referral created with totalProfit ${sum} and totalAmount ${secondLevelBonus}`);

                            // Обновляем баланс второго уровня
                            await prisma.user.update({
                                where: { id: secondLevelUser.id },
                                data: {
                                    balance: secondLevelUser.balance + secondLevelBonus,
                                },
                            });
                            console.log(`Second level user balance updated with second level bonus: ${secondLevelBonus}`);
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

                                // Проверяем и обновляем данные для третьей линии
                                const existingThirdLevelReferral = await prisma.referrals.findFirst({
                                    where: { userId: user.id, typeofline: 3 },
                                });

                                if (existingThirdLevelReferral) {
                                    await prisma.referrals.update({
                                        where: { id: existingThirdLevelReferral.id },
                                        data: {
                                            totalProfit: existingThirdLevelReferral.totalProfit + sum,
                                            totalAmount: existingThirdLevelReferral.totalAmount + thirdLevelBonus,
                                        },
                                    });
                                    console.log(`Third-level referral totalProfit updated by ${sum} and totalAmount updated by ${thirdLevelBonus}`);

                                    // Обновляем баланс пригласившего пользователя (третьего уровня)
                                    await prisma.user.update({
                                        where: { id: thirdLevelUser.id },
                                        data: {
                                            balance: thirdLevelUser.balance + thirdLevelBonus,
                                        },
                                    });
                                    console.log(`Third level user balance updated with third level bonus: ${thirdLevelBonus}`);
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
                                    console.log(`New third-level referral created with totalProfit ${sum} and totalAmount ${thirdLevelBonus}`);

                                    // Обновляем баланс третьего уровня
                                    await prisma.user.update({
                                        where: { id: thirdLevelUser.id },
                                        data: {
                                            balance: thirdLevelUser.balance + thirdLevelBonus,
                                        },
                                    });
                                    console.log(`Third level user balance updated with third level bonus: ${thirdLevelBonus}`);
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

        console.log('Top-up request deleted:', requestId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error processing top-up request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
