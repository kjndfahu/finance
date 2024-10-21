import { prisma } from "../../../../prisma/prisma-client";

export const startDepositTask = async (deposit) => {
    const currentDate = new Date();
    const depositCreationDate = new Date(deposit.createdAt);

// Рассчитываем, сколько времени осталось до 24 часов с момента создания депозита
    const timeUntilNextDay = (24 * 60 * 60 * 1000) - (currentDate.getTime() - depositCreationDate.getTime());

    // Устанавливаем таймер для выполнения через 24 часа
    setTimeout(async () => {
        // Логика для начисления заработка
        const earningPerDay = (parseFloat(deposit.depositSum) / 100) * parseFloat(deposit.percent);

        await prisma.user.update({
            where: { login: deposit.login },
            data: {
                balance: {
                    increment: earningPerDay,
                },
            },
        });

        // Проверяем, завершен ли депозит
        if (currentDate >= new Date(deposit.endDate)) {
            await prisma.deposits.update({
                where: { id: deposit.id },
                data: { status: 'FINISHED' },
            });
            console.log(`Депозит ${deposit.id} завершен и статус обновлен на FINISHED`);
        } else {
            // Запускаем заново setTimeout на следующие 24 часа, если депозит еще активен
            startDepositTask(deposit);
        }
    }, timeUntilNextDay); // Время до следующего начисления (24 часа)
};

// Функция для старта задачи для всех активных депозитов
export const start = async () => {
    const activeDeposits = await prisma.deposits.findMany({
        where: {
            endDate: {
                gte: new Date(),
            },
        },
    });

    // Запускаем задачи для всех активных депозитов
    for (const deposit of activeDeposits) {
        startDepositTask(deposit);
    }
};

export default { start };
