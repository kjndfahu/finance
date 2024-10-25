import { NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma-client';

export async function POST(req: Request) {
    const { sum, email, requestId } = await req.json();

    if (!sum || !email || !requestId) {
        return NextResponse.json({ error: 'Missing sum, email, or requestId' }, { status: 400 });
    }

    try {
        console.log('Получен запрос:', { sum, email, requestId });

        // Поиск пользователя по email
        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            console.error(`Пользователь не найден для email: ${email}`);
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        console.log('Пользователь найден:', user);


        const zeroLineReferral = await prisma.referrals.findFirst({
            where: { userId: user.id, typeofline: 0 },
        });

        if (zeroLineReferral) {
            await prisma.referrals.updateMany({
                where: { userId: user.id, typeofline: 0 },
                data: { typeofline: 1 },
            });
            console.log('Линия 0 обновлена до первой линии.');
        }

        const topUpData = {
            sum: sum,
            email: user.email,
        };

        console.log('Данные для создания операции пополнения:', topUpData);

        const topUpOperation = await prisma.topUpOperations.create({
            data: topUpData,
        });

        console.log('Операция пополнения создана:', topUpOperation);

        // Обновление баланса пользователя
        const updatedUser = await prisma.user.update({
            where: { email: user.email },
            data: {
                balance: user.balance + Number(sum),
            },
        });

        console.log('Баланс пользователя обновлен:', updatedUser);

        // Поиск реферальной записи
        const referral = await prisma.referrals.findFirst({
            where: { userId: user.id },
        });

        console.log('Реферальная запись:', referral);

        if (referral) {
            const firstLevelUser = await prisma.user.findFirst({
                where: { id: referral.referredBy },
            });

            console.log('Пользователь первого уровня:', firstLevelUser);

            if (firstLevelUser) {
                const firstLevelBonus = Number(sum) * 0.08;

                const existingFirstLevelReferral = await prisma.referrals.findFirst({
                    where: { userId: user.id, typeofline: 1 },
                });

                if (existingFirstLevelReferral) {
                    await prisma.referrals.update({
                        where: { id: existingFirstLevelReferral.id },
                        data: {
                            totalProfit: existingFirstLevelReferral.totalProfit + Number(sum),
                            totalAmount: existingFirstLevelReferral.totalAmount + firstLevelBonus,
                            totalReferrals: 1,
                        },
                    });
                    console.log(`Обновлена первая линия: totalProfit +${sum}, totalAmount +${firstLevelBonus}`);

                    await prisma.user.update({
                        where: { id: firstLevelUser.id },
                        data: {
                            balance: firstLevelUser.balance + firstLevelBonus,
                        },
                    });
                    console.log(`Баланс пользователя первого уровня обновлен на ${firstLevelBonus}`);
                } else {
                    await prisma.referrals.create({
                        data: {
                            userId: user.id,
                            totalAmount: firstLevelBonus,
                            totalReferrals: 1,
                            totalProfit: Number(sum),
                            typeofline: 1,
                            referredBy: referral.referredBy,
                        },
                    });
                    console.log(`Создана первая линия с totalProfit ${sum} и totalAmount ${firstLevelBonus}`);

                    await prisma.user.update({
                        where: { id: firstLevelUser.id },
                        data: {
                            balance: firstLevelUser.balance + firstLevelBonus,
                        },
                    });
                    console.log(`Баланс пользователя первого уровня обновлен на ${firstLevelBonus}`);
                }

                const secondLevelReferral = await prisma.referrals.findFirst({
                    where: { userId: firstLevelUser.id },
                });

                console.log('Реферал второго уровня:', secondLevelReferral);

                if (secondLevelReferral) {
                    const secondLevelUser = await prisma.user.findFirst({
                        where: { id: secondLevelReferral.referredBy },
                    });

                    console.log('Пользователь второго уровня:', secondLevelUser);

                    if (secondLevelUser) {
                        const secondLevelBonus = Number(sum) * 0.06;

                        const existingSecondLevelReferral = await prisma.referrals.findFirst({
                            where: { userId: user.id, typeofline: 2 },
                        });

                        if (existingSecondLevelReferral) {
                            await prisma.referrals.update({
                                where: { id: existingSecondLevelReferral.id },
                                data: {
                                    totalProfit: existingSecondLevelReferral.totalProfit + Number(sum),
                                    totalAmount: existingSecondLevelReferral.totalAmount + secondLevelBonus,
                                },
                            });
                            console.log(`Обновлена вторая линия: totalProfit +${sum}, totalAmount +${secondLevelBonus}`);

                            await prisma.user.update({
                                where: { id: secondLevelUser.id },
                                data: {
                                    balance: secondLevelUser.balance + secondLevelBonus,
                                },
                            });
                            console.log(`Баланс пользователя второго уровня обновлен на ${secondLevelBonus}`);
                        } else {
                            await prisma.referrals.create({
                                data: {
                                    userId: user.id,
                                    totalAmount: secondLevelBonus,
                                    totalReferrals: 0,
                                    totalProfit: Number(sum),
                                    typeofline: 2,
                                    referredBy: secondLevelReferral.referredBy,
                                },
                            });
                            console.log(`Создана вторая линия с totalProfit ${sum} и totalAmount ${secondLevelBonus}`);

                            await prisma.user.update({
                                where: { id: secondLevelUser.id },
                                data: {
                                    balance: secondLevelUser.balance + secondLevelBonus,
                                },
                            });
                            console.log(`Баланс пользователя второго уровня обновлен на ${secondLevelBonus}`);
                        }

                        const thirdLevelReferral = await prisma.referrals.findFirst({
                            where: { userId: secondLevelUser.id },
                        });

                        console.log('Реферал третьего уровня:', thirdLevelReferral);

                        if (thirdLevelReferral) {
                            const thirdLevelUser = await prisma.user.findFirst({
                                where: { id: thirdLevelReferral.referredBy },
                            });

                            console.log('Пользователь третьего уровня:', thirdLevelUser);

                            if (thirdLevelUser) {
                                const thirdLevelBonus = Number(sum) * 0.03;

                                const existingThirdLevelReferral = await prisma.referrals.findFirst({
                                    where: { userId: user.id, typeofline: 3 },
                                });

                                if (existingThirdLevelReferral) {
                                    await prisma.referrals.update({
                                        where: { id: existingThirdLevelReferral.id },
                                        data: {
                                            totalProfit: existingThirdLevelReferral.totalProfit + Number(sum),
                                            totalAmount: existingThirdLevelReferral.totalAmount + thirdLevelBonus,
                                        },
                                    });
                                    console.log(`Обновлена третья линия: totalProfit +${sum}, totalAmount +${thirdLevelBonus}`);

                                    await prisma.user.update({
                                        where: { id: thirdLevelUser.id },
                                        data: {
                                            balance: thirdLevelUser.balance + thirdLevelBonus,
                                        },
                                    });
                                    console.log(`Баланс пользователя третьего уровня обновлен на ${thirdLevelBonus}`);
                                } else {
                                    await prisma.referrals.create({
                                        data: {
                                            userId: user.id,
                                            totalAmount: thirdLevelBonus,
                                            totalReferrals: 0,
                                            totalProfit: Number(sum),
                                            typeofline: 3,
                                            referredBy: thirdLevelReferral.referredBy,
                                        },
                                    });
                                    console.log(`Создана третья линия с totalProfit ${sum} и totalAmount ${thirdLevelBonus}`);

                                    await prisma.user.update({
                                        where: { id: thirdLevelUser.id },
                                        data: {
                                            balance: thirdLevelUser.balance + thirdLevelBonus,
                                        },
                                    });
                                    console.log(`Баланс пользователя третьего уровня обновлен на ${thirdLevelBonus}`);
                                }

                            } else {
                                console.warn(`Пользователь третьего уровня не найден для ID: ${thirdLevelReferral.referredBy}`);
                            }
                        } else {
                            console.warn(`Реферал третьего уровня не найден для пользователя ID: ${secondLevelUser.id}`);
                        }
                    } else {
                        console.warn(`Пользователь второго уровня не найден для ID: ${secondLevelReferral.referredBy}`);
                    }
                } else {
                    console.warn(`Реферал второго уровня не найден для пользователя ID: ${firstLevelUser.id}`);
                }
            } else {
                console.warn(`Пользователь первого уровня не найден для ID: ${referral.referredBy}`);
            }
        } else {
            console.log(`Реферальная запись не найдена для пользователя ${email}`);
        }

        const topUpRequest = await prisma.topUpRequest.findFirst({
            where: { id: requestId },
        });

        console.log('Запрос на пополнение:', topUpRequest);

        if (!topUpRequest) {
            console.error(`Запрос на пополнение не найден для ID: ${requestId}`);
            return NextResponse.json({ error: 'Top-up request not found' }, { status: 404 });
        }

        await prisma.topUpRequest.delete({
            where: { id: requestId },
        });

        console.log('Запрос на пополнение удален');

        return NextResponse.json({ success: 'Balance and referrals updated' }, { status: 200 });
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
