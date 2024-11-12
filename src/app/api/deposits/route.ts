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

        const user = await prisma.user.findUnique({
            where: { login: login },
        });

        if (!user) {
            return new Response(JSON.stringify({ error: 'Пользователь не найден' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (parseFloat(balance) !== user.balance) {
            return new Response(JSON.stringify({ error: 'Баланс не совпадает с балансом пользователя' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const depositAmount = parseFloat(depositSum);
        const [minAmount, maxAmount] = getDepositRange(percent);

        if (depositAmount < minAmount || depositAmount > maxAmount) {
            return new Response(JSON.stringify({ error: `Сумма депозита должна быть от $${minAmount} до $${maxAmount}` }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const newDeposit = await prisma.deposits.create({
            data: {
                login,
                balance: parseFloat(balance),
                depositSum: depositSum,
                earning: parseFloat(earning),
                percent: percent,
                withdrawSum: parseFloat(withdrawSum),
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

        cron.startDepositTask(login, newDeposit);

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

export async function GET() {
    const deposits = await prisma.deposits.findMany();
    return NextResponse.json(deposits);
}