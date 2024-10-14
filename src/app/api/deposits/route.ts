// app/api/deposits/route.ts

import { prisma } from "../../../../prisma/prisma-client";
import cron from './cronTasks'; // Импортируем объект cron с методом start

// Обработчик POST-запроса для создания депозита
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
                balance: parseInt(balance, 10),
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

// Функция для получения диапазона суммы депозита в зависимости от процента
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

// Запуск планировщика
cron.start(); // Теперь корректно вызываем метод start
