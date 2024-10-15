import { prisma } from "../../../../prisma/prisma-client";
import cron from './cronTasks';
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

        console.log({
            login,
            balance,
            depositSum,
            earning,
            percent,
            withdrawSum,
            endDate,
            status
        });

        const depositAmount = parseFloat(depositSum);

        // Validate deposit amount based on percent
        const [minAmount, maxAmount] = getDepositRange(percent);
        if (depositAmount < minAmount || depositAmount > maxAmount) {
            return new Response(JSON.stringify({ error: `Сумма депозита должна быть от $${minAmount} до $${maxAmount}` }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Create new deposit entry
        const newDeposit = await prisma.deposits.create({
            data: {
                login,
                balance: parseInt(balance, 10),
                depositSum: depositSum,
                earning: parseFloat(earning),
                percent: percent,
                withdrawSum: parseFloat(withdrawSum),
                endDate: new Date(endDate),
                status,
            },
        });

        // Update the user's balance
        await prisma.user.update({
            where: { login: login },
            data: {
                balance: {
                    decrement: depositAmount,
                },
            },
        });

        // Check if the user has a referral entry
        const referral = await prisma.referrals.findFirst({
            where: { userId: newDeposit.userId },
        });

        if (referral) {
            const referrerProfit = parseFloat(earning) * 0.05;

            await prisma.referrals.update({
                where: { id: referral.id },
                data: {
                    totalProfit: {
                        increment: referrerProfit,
                    },
                    totalAmount: {
                        increment: depositAmount,
                    },
                },
            });

            console.log(`Referrer (ID: ${referral.userId}) received ${referrerProfit} from user ${login}'s deposit.`);
        } else {
            console.log(`No referral found for user ${login}.`);
        }

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

// Function to get deposit range based on percent
const getDepositRange = (percent: string) => {
    switch (percent) {
        case '0.9':
            return [100, 1000];
        case '1.3':
            return [1000, 2000];
        case '1.7':
            return [2000, 3000];
        default:
            return [0, Infinity];
    }
};

cron.start();


export async function GET() {
    const deposits = await prisma.deposits.findMany();
    return NextResponse.json(deposits);
}
