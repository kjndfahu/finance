
import {addDays, format} from "date-fns";

interface Props{
    className?:string,
    dataStocks:number; //30
    lowPercent:string; //0.9
    value?:string; //1000
}

export const ETFInfo:React.FC<Props> = ({value = 0, dataStocks,lowPercent,  className}) => {
    const calculatingAllMoney = (value, dataStocks, lowPercent, ) => {
        const newPercent = +(lowPercent);
        const newValue = +(value);
       return newValue+(newValue/100*newPercent*dataStocks)
   }
    const totalMoney = calculatingAllMoney(value, dataStocks, lowPercent)

    const calculatingEarning = (value, totalMoney) => {
        const newValue = +(value);
        return totalMoney - newValue;
    }
    const earnings = calculatingEarning(value, totalMoney);
    const currentDatePlus30Days = format(addDays(new Date(), 30), 'dd.MM.yy HH:mm:ss');

    const createDeposit = async () => {
        try {
            const response = await fetch('/api/deposits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: 'messi',
                    balance: 0,
                    depositSum: value,
                    earning: earnings,
                    percent: lowPercent,
                    withdrawSum: totalMoney,
                    endDate: currentDatePlus30Days,
                    status: 'INWORK',
                }),
            });

            if (!response.ok) {
                throw new Error('Ошибка при создании депозита');
            }

            console.log('Депозит успешно создан');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };
    return (
        <div className="w-full mx-auto bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">
                Персональная информация по депозиту
            </h2>

            <div className="grid grid-cols-3 gap-4 text-left">
                <div>
                    <p className="text-gray-500">Сумма на выходе</p>
                    <p className="text-2xl font-bold">${totalMoney.toFixed(2)}</p>
                </div>

                <div>
                    <p className="text-gray-500">Начисленная прибыль</p>
                    <p className="text-2xl font-bold">${earnings.toFixed(2)}</p>
                </div>

                <div>
                    <p className="text-gray-500">Дата окончания</p>
                    <p className="text-2xl font-bold">{currentDatePlus30Days}</p>
                </div>
            </div>

            <button
                onClick={createDeposit}
                className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Создать депозит
            </button>
        </div>
    );
};