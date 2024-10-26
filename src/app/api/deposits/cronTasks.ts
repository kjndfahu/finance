import cron from 'node-cron';
import { prisma } from "../../../../prisma/prisma-client";

const tasks = {};

const processSingleDepositEarnings = async (deposit) => {
    const { earning, id, login, endDate, percent, depositSum } = deposit;

    console.log(`Обработка депозита ${id} для ${login}: сумма ${earning}`);

    // Начисляем проценты на основе текущей суммы
    const earningPerMinute = (parseFloat(earning) * percent) / 100; // Убираем округление

    console.log(`Начислено: ${earningPerMinute} для пользователя ${login}`);

    try {
        await prisma.$transaction(async (prisma) => {
            // Проверяем, достаточно ли средств для начисления
            const user = await prisma.user.findUnique({ where: { login } });

            if (earningPerMinute > 0) {
                await prisma.user.update({
                    where: { login },
                    data: {
                        balance: {
                            increment: earningPerMinute,
                        },
                    },
                });
                console.log(`Начислено ${earningPerMinute} пользователю ${login} по депозиту ${id}`);
            } else {
                console.log(`Нет целых единиц для начисления пользователю ${login} по депозиту ${id}`);
            }

            // Проверяем, завершился ли депозит
            if (new Date() >= new Date(endDate)) {
                await prisma.deposits.update({
                    where: { id },
                    data: { status: 'FINISHED' },
                });
                console.log(`Депозит ${id} завершен и статус обновлен на FINISHED`);

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

const processDepositEarnings = async (login) => {
    try {
        const activeDeposits = await prisma.deposits.findMany({
            where: {
                login,
                endDate: {
                    gte: new Date(),
                },
            },
        });

        console.log(`Найдено активных депозитов для ${login}: ${activeDeposits.length}`);

        // Получаем текущее время
        const now = new Date();
        const currentSeconds = now.getSeconds();
        const currentMinutes = now.getMinutes()

        for (const deposit of activeDeposits) {
            const depositCreationDate = new Date(deposit.createdAt);
            const depositSeconds = depositCreationDate.getSeconds();
            const depositMinutes = depositCreationDate.getMinutes();

            // Проверяем, совпадают ли секунды создания депозита с текущими
            if (currentMinutes === depositMinutes && currentSeconds === depositSeconds) {
                console.log(`Начисление процентов по депозиту ${deposit.id} для пользователя ${login}`);
                await processSingleDepositEarnings(deposit);
            } else {
                console.log(`Секунды не совпадают: текущие ${currentSeconds}, депозит ${depositSeconds}`);
            }
        }
    } catch (error) {
        console.error(`Ошибка при получении активных депозитов для пользователя ${login}:`, error);
    }
};

const startDepositTask = (login) => {
    if (tasks[login]) {
        tasks[login].stop();
        console.log(`Старая задача для пользователя ${login} остановлена.`);
    }

    tasks[login] = cron.schedule('* * * * * *', async () => {
        console.log(`Запущена задача для пользователя ${login}`);
        await processDepositEarnings(login);
    });

    console.log(`Запущена задача для пользователя ${login} с интервалом в 1 секунду.`);
};

// Экспортируем метод
export default { startDepositTask };