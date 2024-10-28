import cron from 'node-cron';
import { prisma } from "../../../../prisma/prisma-client";

const tasks = {};

const processSingleDepositEarnings = async (deposit) => {
    const { earning, id, login, endDate, percent, depositSum } = deposit;

    console.log(`Обработка депозита ${id} для ${login}: сумма ${earning}`);

    // Начисляем проценты на основе текущей суммы
    const earningPerMinute = (parseFloat(depositSum) * percent) / 100;

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
                console.log(endDate, 'endDate')
                console.log(new Date(), 'newDate')
            } else {
                console.log(`Нет целых единиц для начисления пользователю ${login} по депозиту ${id}`);
            }

            // Проверяем, завершился ли депозит
            if (new Date() > new Date(endDate)) {
                console.log(`Попытка обновления статуса депозита ${id} для пользователя ${login}`);
                const updatedDeposit = await prisma.deposits.update({
                    where: { id },
                    data: { status: 'FINISHED' },
                });
                console.log(`Статус депозита ${id} обновлен на: ${updatedDeposit.status}`);

                const updatedUser = await prisma.user.update({
                    where: { login },
                    data: {
                        balance: {
                            increment: parseFloat(depositSum),
                        },
                    },
                });
                console.log(`Сумма депозита ${depositSum} добавлена к балансу пользователя ${login}. Новый баланс: ${updatedUser.balance}`);
            } else{
                console.log('Еще не время')
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

        const inactiveDeposits = await prisma.deposits.findMany({
            where: {
                login,
                endDate: {
                    lte: new Date(),
                },
            },
        });

        for(const deposit of inactiveDeposits){
            try {
                if (new Date() > new Date(deposit.endDate) && deposit.status === 'INWORK') {
                    const earningPerMinute = (parseFloat(deposit.depositSum) * +(deposit.percent)) / 100;
                    console.log(`Обновление статуса депозита ${deposit.id} на FINISHED`);
                    const updatedDeposit = await prisma.deposits.update({
                        where: { id: deposit.id },
                        data: { status: 'FINISHED' },
                    });
                    console.log(`Статус депозита ${deposit.id} обновлен: ${updatedDeposit.status}`);

                    // Добавление суммы депозита к балансу пользователя
                    const updatedUser = await prisma.user.update({
                        where: { login },
                        data: {
                            balance: {
                                increment: parseFloat(deposit.depositSum) + earningPerMinute,
                            },
                        },
                    });
                    console.log(`Сумма депозита ${deposit.depositSum} добавлена к балансу пользователя ${login}. Новый баланс: ${updatedUser.balance}`);
                }
            } catch (error) {
                console.error(`Ошибка при изменении статуса депозита или обновлении баланса пользователя ${login}:`, error);
            }
        }


        console.log(`Найдено активных депозитов для ${login}: ${activeDeposits.length}`);

        // Получаем текущее время
        const now = new Date();
        const currentSeconds = now.getSeconds();
        const currentMinutes = now.getMinutes()
        const currentHours = now.getUTCHours();
        console.log(currentHours, 'current')

        for (const deposit of activeDeposits) {

            const depositCreationDate = new Date(deposit.createdAt);
            const depositSeconds = depositCreationDate.getSeconds();
            const depositMinutes = depositCreationDate.getMinutes();
            const depositHours = (depositCreationDate.getUTCHours())

            // Проверяем, совпадают ли секунды создания депозита с текущими

            if (currentHours === depositHours && currentMinutes === depositMinutes && currentSeconds === depositSeconds) {
                console.log(`Начисление процентов по депозиту ${deposit.id} для пользователя ${login}`);

                console.log(now.getHours(), 'current')
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