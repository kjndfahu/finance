import { addDays, format, isAfter } from "date-fns";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface Props {
    className?: string;
    dataStocks: number;
    lowPercent: string; // Убедитесь, что передаете строку
    value?: string; // Сумма депозита в виде строки
    session: any; // Проп для передачи сессии пользователя
}

export const ETFInfo: React.FC<Props> = ({ value = "0", dataStocks, lowPercent, className, session }) => {
    const [status, setStatus] = useState<'INWORK' | 'FINISHED'>('INWORK');

    const depositSumAsNumber = parseFloat(value); // Преобразуем введенное значение в число

    // Функция для получения диапазона суммы депозита в зависимости от процента
    const getDepositRange = (percent: string) => {
        switch (percent) {
            case '0.9':
                return { min: 100, max: 1000 }; // Для первого тарифа
            case '1.3':
                return { min: 1000, max: 2000 }; // Для второго тарифа
            case '1.7':
                return { min: 2000, max: 3000 }; // Для третьего тарифа
            default:
                return { min: 0, max: Infinity }; // Если тариф не найден, возвращаем неограниченный диапазон
        }
    };

    const selectedRange = getDepositRange(lowPercent);

    // Вычисления для депозитов
    const calculatingAllMoney = (value: string, dataStocks: number, lowPercent: string) => {
        const newPercent = parseFloat(lowPercent);
        const newValue = parseFloat(value);
        return newValue + (newValue / 100 * newPercent * dataStocks);
    };

    const totalMoney = calculatingAllMoney(value, dataStocks, lowPercent);

    const calculatingEarning = (value: string, totalMoney: number) => {
        const newValue = parseFloat(value);
        return totalMoney - newValue;
    };

    const earnings = calculatingEarning(value, totalMoney);
    const currentDatePlus30Days = addDays(new Date(), 30);
    const formattedEndDate = format(currentDatePlus30Days, 'dd.MM.yy HH:mm:ss');

    useEffect(() => {
        if (isAfter(new Date(), currentDatePlus30Days)) {
            setStatus('FINISHED');
        }
    }, [session.user.balance, currentDatePlus30Days]);

    useEffect(() => {
        // Проверка на диапазон суммы депозита
        if (depositSumAsNumber < selectedRange.min || depositSumAsNumber > selectedRange.max) {
            toast.error(`Сумма депозита должна быть в диапазоне от $${selectedRange.min} до $${selectedRange.max}.`);
            return;
        }
    }, [depositSumAsNumber, lowPercent]);

    const handleCreateDeposit = async () => {
        const depositSumAsNumber = parseFloat(value);

        if (depositSumAsNumber > session.user.balance) {
            toast.error('Сумма депозита превышает ваш баланс!');
            return;
        }

        if (!lowPercent || lowPercent === '0') {
            toast.error('Не выбран тариф!');
            return;
        }

        const depositData = {
            login: session.user.name,
            balance: session.user.balance,
            depositSum: value,
            earning: earnings,
            percent: lowPercent,
            withdrawSum: totalMoney,
            endDate: currentDatePlus30Days,
            status
        };

        try {
            const response = await fetch('/api/deposits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(depositData),
            });

            if (response.ok) {
                toast.success('Депозит успешно создан');
            } else {
                toast.error('Ошибка при создании депозита');
            }
        } catch (error) {
            toast.error('Ошибка при отправке запроса');
        }
    };

    return (
        <div className="w-full mx-auto bg-white rounded-lg md:p-6">
            <h2 className="md:text-lg text-[15px] font-semibold mb-4">Персональная информация по депозиту</h2>

            <div className="grid grid-cols-3 gap-4 text-left">
                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">Сумма на выходе</p>
                    <p className="md:text-2xl text-[18px] font-bold">${totalMoney.toFixed(2)}</p>
                </div>

                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">Начисленная прибыль</p>
                    <p className="md:text-2xl text-[18px] font-bold">${earnings.toFixed(2)}</p>
                </div>

                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">Дата окончания</p>
                    <p className="md:text-2xl text-[18px] font-bold">{formattedEndDate}</p>
                </div>
            </div>

            <button onClick={handleCreateDeposit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md">Создать депозит</button>
        </div>
    );
};
