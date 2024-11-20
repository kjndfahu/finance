import cron from 'node-cron';
import { prisma } from "../../../../prisma/prisma-client";

const tasks = {};

const processSingleDepositEarnings = async (deposit) => {
    const { earning, id, login, endDate, percent, depositSum } = deposit;

    console.log(`Обработка депозита ${id} для ${login}: текущая сумма ${earning}`);

    const earningPerDay = (parseFloat(depositSum) * percent) / 100;

    try {
        await prisma.$transaction(async (prisma) => {
            const user = await prisma.user.findUnique({ where: { login } });

            if (!user) {
                console.error(`Пользователь с логином ${login} не найден.`);
                return;
            }

            console.log(`Пользователь найден: ${user.login}, текущий баланс: ${user.balance}`);

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
                console.log(`Дата окончания депозита ${id} (${endDate}) достигнута.`);

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
                console.log(`Сумма депозита ${depositSum} возвращена пользователю ${login}.`);
            }
        });
    } catch (error) {
        console.error(`Ошибка при обновлении баланса для пользователя ${login}:`, error);
    }
};

const startDepositTask = async (login, deposit) => {
    const creationDate = new Date(deposit.createdAt);
    const nextExecutionDate = new Date(creationDate.getTime() + 24 * 60 * 60 * 1000);

    const minutes = nextExecutionDate.getUTCMinutes();
    const hours = nextExecutionDate.getUTCHours();

    const taskKey = `${login}_${deposit.id}`;

    if (tasks[taskKey]) {
        tasks[taskKey].stop();
        console.log(`Старая задача для депозита ${deposit.id} пользователя ${login} остановлена.`);
    }

    tasks[taskKey] = cron.schedule(`${minutes} ${hours} * * *`, async () => {
        console.log(`Запущена задача для депозита ${deposit.id} пользователя ${login}, каждый день в ${hours}:${minutes}.`);
        await processSingleDepositEarnings(deposit);
    });

    console.log(`Задача для депозита ${deposit.id} пользователя ${login} запущена и будет выполняться каждый день в ${hours}:${minutes}.`);
};

export default { startDepositTask };
