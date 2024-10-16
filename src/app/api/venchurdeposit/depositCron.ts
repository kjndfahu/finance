import cron from 'node-cron';
import { prisma } from "../../../../prisma/prisma-client";


export const start = () => {
    cron.schedule('0 * * * *', async () => {
        const currentDate = new Date();

        const finishedDeposits = await prisma.deposits.findMany({
            where: {
                endDate: {
                    lte: currentDate,
                },
                status: 'INWORK',
            },
        });

        for (const deposit of finishedDeposits) {
            const allSum = deposit.withdrawSum.toString();
            await prisma.user.update({
                where: { login: deposit.login },
                data: {
                    balance: {
                        increment: parseFloat(allSum),
                    },
                },
            });

            await prisma.deposits.update({
                where: { id: deposit.id },
                data: { status: 'FINISHED' },
            });
            console.log(`Депозит ${deposit.id} завершен и статус обновлен на FINISHED`);
        }
    });
};

export default { start };
