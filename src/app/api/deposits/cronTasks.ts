import cron from 'node-cron';
import { prisma } from "../../../../prisma/prisma-client";

export const start = () => {
    cron.schedule('0 0 * * *', async () => {
        const currentDate = new Date();

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

            if (currentDate >= new Date(deposit.endDate)) {
                await prisma.deposits.update({
                    where: { id: deposit.id },
                    data: { status: 'FINISHED' },
                });
                console.log(`Депозит ${deposit.id} завершен и статус обновлен на FINISHED`);
            }
        }
    });
};

export default { start };
