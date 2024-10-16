import { prisma } from "../../../../prisma/prisma-client";
import cron from './depositCron';
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
    try {
        const {
            login,
            balance,
            depositSum,
            earning,
            percent,
            withdrawSum,
            endDate,
            status
        } = await req.json();

        console.log("Received data:", {
            login,
            balance,
            depositSum,
            earning,
            percent,
            withdrawSum,
            endDate,
            status
        });

        // Validate deposit amount
        const depositAmount = parseFloat(depositSum);
        const [minAmount, maxAmount] = getDepositRange(percent);

        if (depositAmount < minAmount || depositAmount > maxAmount) {
            return new Response(JSON.stringify({ error: `Сумма депозита должна быть от $${minAmount} до $${maxAmount}` }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Create new deposit entry
        const finalAmount = parseFloat(withdrawSum); // Сумма, которая будет зачислена в конце
        const newDeposit = await prisma.deposits.create({
            data: {
                login,
                balance: parseInt(balance, 10),
                depositSum: depositSum,
                earning: parseFloat(earning),
                percent: percent,
                withdrawSum: finalAmount,
                endDate: new Date(endDate),
                status,
            },
        });

        await prisma.user.update({
            where: { login: login },
            data: {
                balance: {
                    decrement: depositAmount,
                },
            },
        });

        const referral = await prisma.referrals.findUnique({
            where: { userId: (await prisma.user.findUnique({ where: { login } }))?.id }
        });

        if (referral) {
            const referrerId = referral.referredBy;
            const referralBonus = depositAmount * 0.06;

            await prisma.user.update({
                where: { id: referrerId },
                data: {
                    balance: {
                        increment: referralBonus,
                    },
                },
            });

            console.log(`Referral bonus of ${referralBonus} credited to referrer with ID: ${referrerId}`);
        } else {
            console.log(`No referral found for user ${login}`);
        }

        console.log(`Deposit created successfully:`, newDeposit);
        return new Response(JSON.stringify({ message: 'Депозит успешно создан', deposit: newDeposit }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Ошибка при создании депозита:', error);
        return new Response(JSON.stringify({ error: 'Ошибка сервера при создании депозита' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

const getDepositRange = (percent: string) => {
    switch (percent) {
        case '2':
            return [3000, 5000];
        case '2.5':
            return [5000, 10000];
        case '3':
            return [10000, 50000];
        default:
            return [0, Infinity];
    }
};

cron.start();

export async function GET() {
    const deposits = await prisma.deposits.findMany();
    return NextResponse.json(deposits);
}
