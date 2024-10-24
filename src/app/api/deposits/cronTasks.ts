import { prisma } from "../../../../prisma/prisma-client";

const tasks = {};
const activeTasks = {};
const depositAccruals = {}; // Объект для хранения дробной части начислений

// Функция для начисления процентов от конкретного депозита пользователя
const processSingleDepositEarnings = async (deposit) => {
    const { earning, id, login, endDate, percent, depositSum } = deposit;

    console.log(`Обработка депозита ${id} для ${login}: сумма ${earning}`);

    // Начисляем проценты на основе текущей суммы
    const earningPerMinute = (parseFloat(earning) * percent) / 100;

    // Обновляем дробную часть начислений
    depositAccruals[login] = depositAccruals[login] || 0; // Инициализация, если еще нет
    depositAccruals[login] += earningPerMinute; // Увеличиваем дробную часть

    const integerPart = Math.floor(depositAccruals[login]); // Целая часть
    depositAccruals[login] -= integerPart; // Оставляем только дробную часть

    try {
        // Открываем транзакцию для начисления процента и обновления статуса
        await prisma.$transaction(async (prisma) => {
            // Обновляем баланс пользователя с учётом целой части начислений
            if (integerPart > 0) {
                await prisma.user.update({
                    where: { login },
                    data: {
                        balance: {
                            increment: integerPart,
                        },
                    },
                });
                console.log(`Начислено ${integerPart.toFixed(2)} пользователю ${login} по депозиту ${id}`);
            }

            // Если депозит завершён, обновляем статус и добавляем сумму депозита к балансу
            if (new Date() >= new Date(endDate)) {
                await prisma.deposits.update({
                    where: { id },
                    data: { status: 'FINISHED' },
                });
                console.log(`Депозит ${id} завершен и статус обновлен на FINISHED`);

                // Добавляем сумму депозита к балансу пользователя
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

// Функция для поиска и обновления всех активных депозитов пользователя
const processDepositEarnings = async (login) => {
    if (activeTasks[login]) return; // Предотвращаем параллельное выполнение

    activeTasks[login] = true;
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
        const currentMinutes = now.getMinutes();
        const currentHours = now.getHours();

        // Обрабатываем каждый активный депозит пользователя отдельно
        for (const deposit of activeDeposits) {
            const depositCreationDate = new Date(deposit.createdAt);
            const depositSeconds = depositCreationDate.getSeconds();
            const depositMinutes = depositCreationDate.getMinutes();
            const depositHours = depositCreationDate.getHours();

            // Проверяем, совпадают ли часы, минуты и секунды создания депозита с текущими
            if (currentSeconds === depositSeconds && currentMinutes === depositMinutes && currentHours === depositHours) {
                await processSingleDepositEarnings(deposit);
            }
        }
    } catch (error) {
        console.error(`Ошибка при получении активных депозитов для ${login}:`, error);
    } finally {
        activeTasks[login] = false; // Освобождаем флаг выполнения
    }
};

// Запускаем задачу для начисления процентов
const startDepositTask = (login) => {
    if (tasks[login]) {
        clearInterval(tasks[login]); // Остановить предыдущую задачу, если она существует
        console.log(`Старая задача для пользователя ${login} остановлена.`);
    }

    // Запланировать задачу с интервалом в 1 секунду для проверки депозитов
    tasks[login] = setInterval(async () => {
        console.log(`Запущена задача для пользователя ${login}`);
        await processDepositEarnings(login);
    }, 1000); // Интервал в 1 секунду

    console.log(`Запущена задача для пользователя ${login} с интервалом в 1 секунду.`);
};

// Экспортируем метод
export default { startDepositTask };
