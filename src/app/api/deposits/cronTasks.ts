import cron from 'node-cron';
import { prisma } from "../../../../prisma/prisma-client";

const tasks = {};

const processSingleDepositEarnings = async (deposit) => {
    const { earning, id, login, endDate, percent, depositSum } = deposit;

    console.log(`Обработка депозита ${id} для ${login}: текущая сумма ${earning}`);

    const earningPerDay = (parseFloat(depositSum) * percent) / 100;

    try {
        await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findMany({ where: { login } });

            if (earningPerDay > 0) {
                await prisma.user.update({
                    where: { login },
                    data: {
                        balance: {
                            increment: earningPerDay,
                        },
                    },
                });
                console.log(`Начислено ${earningPerDay} пользователю ${login} по депозиту ${id}`);
            }


            if (new Date() > new Date(endDate)) {

                await prisma.deposits.update({
                    where: { id },
                    data: { status: 'FINISHED' },
                });

                await prisma.user.update({
                    where: { login },
                    data: {
                        balance: {
                            increment: parseFloat(depositSum),
                        },
                    },
                });
                console.log(`Сумма депозита ${depositSum} добавлена к балансу пользователя ${login}`);
            }
        });
    } catch (error) {
        console.error(`Ошибка при обновлении баланса для пользователя ${login}:`, error);
    }
};

const startDepositTask = async (login, deposit) => {
    const creationDate = new Date(deposit.createdAt);
    const nextExecutionDate = new Date(creationDate.getTime() + 24 * 60 * 60 * 1000);

    const hours = nextExecutionDate.getUTCHours();
    const minutes = nextExecutionDate.getMinutes();

    if (tasks[login]) {
        tasks[login].stop();
        console.log(`Старая задача для пользователя ${login} остановлена.`);
    }

    tasks[login] = cron.schedule(`${minutes} ${hours} * * *`, async () => {
        console.log(`Запущена ежедневная задача для пользователя ${login} в ${hours}:${minutes}.`);
        await processSingleDepositEarnings(deposit);
    });

    console.log(`Задача для пользователя ${login} запущена и будет выполняться в ${hours}:${minutes} каждый день.`);
};


export default { startDepositTask };