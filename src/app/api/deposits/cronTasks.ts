// app/api/deposits/cronTasks.ts

import cron from 'node-cron';
import { prisma } from "../../../../prisma/prisma-client";

// Запускаем планировщик каждую ночь в 00:00
export const start = () => {
    cron.schedule('0 0 * * *', async () => {
        const currentDate = new Date();

        // Находим все депозиты, у которых не наступила конечная дата
        const activeDeposits = await prisma.deposits.findMany({
            where: {
                endDate: {
                    gte: currentDate,
                },
            },
        });

        for (const deposit of activeDeposits) {
            const earningPerDay = (parseFloat(deposit.depositSum) / 100) * parseFloat(deposit.percent);

            await prisma.user.update({
                where: { login: deposit.login },
                data: {
                    balance: {
                        increment: earningPerDay,
                    },
                },
            });
        }
    });
};

export default { start }; // Экспортируем объект с методом start
