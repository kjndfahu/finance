import cron from 'node-cron';
import { prisma } from "../../../../prisma/prisma-client";

const tasks = {};

const processSingleDepositEarnings = async (deposit) => {
    const { earning, id, login, endDate, percent, depositSum, status } = deposit;

    if (status === 'FINISHED') {
        console.log(`Депозит ${id} уже завершен, начисления остановлены.`);
        return;
    }

    if ( status === 'INWORK' && (new Date() >= new Date(endDate))) {
        console.log(`Дата окончания депозита ${id} (${endDate}) достигнута.`);
        
        try {
            await prisma.$transaction(async (prisma) => {
                await prisma.deposits.update({
                    where: { id },
                    data: { status: 'FINISHED' },
                });

                const user = await prisma.user.findUnique({ where: { login } });
                if (!user) {
                    console.error(`Пользователь с логином ${login} не найден.`);
                    return;
                }

                await prisma.user.update({
                    where: { login },
                    data: {
                        balance: {
                            increment: parseFloat(depositSum),
                        },
                    },
                });
                console.log(`Сумма депозита ${depositSum} возвращена пользователю ${login}.`);
            });
        } catch (error) {
            console.error(`Ошибка при завершении депозита для пользователя ${login}:`, error);
        }
        return;
    }

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
        });
    } catch (error) {
        console.error(`Ошибка при обновлении баланса для пользователя ${login}:`, error);
    }
};

const startDepositTask = async (login, deposit) => {
    const taskKey = `${login}_${deposit.id}`;
    const creationDate = new Date(deposit.createdAt);
    const nextExecutionDate = new Date(creationDate.getTime() + 24 * 60 * 60 * 1000);
    const minutes = nextExecutionDate.getUTCMinutes();
    const hours = nextExecutionDate.getUTCHours();

    if (tasks[taskKey]) {
        tasks[taskKey].stop();
        console.log(`Старая задача для депозита ${deposit.id} пользователя ${login} остановлена.`);
    }

    tasks[taskKey] = cron.schedule(`${minutes} ${hours} * * *`, async () => {
        console.log(`Запущена задача для депозита ${deposit.id} пользователя ${login}, каждую минуту.`);

        const currentDeposit = await prisma.deposits.findUnique({
            where: { id: deposit.id }
        });

        if (!currentDeposit) {
            console.error(`Депозит ${deposit.id} не найден в базе данных.`);
            tasks[taskKey].stop();
            return;
        }

        await processSingleDepositEarnings(currentDeposit);
    });

    console.log(`Задача для депозита ${deposit.id} пользователя ${login} запущена и будет выполняться каждую минуту.`);
};


export default { startDepositTask };
