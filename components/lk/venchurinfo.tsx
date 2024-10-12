import {addDays, format} from "date-fns";

interface Props{
    className?:string,
    dataVenchur:number;
    middlePercent:string;
    value?:string;
}

export const VenchurInfo:React.FC<Props> = ({value = 0, dataVenchur,middlePercent,className}) => {
    const calculatingAllMoney = (value, dataVenchur, middlePercent, ) => {
        const newPercent = +(middlePercent);
        const newValue = +(value);
        return newValue+(newValue/100*newPercent*dataVenchur)
    }
    const totalMoney = calculatingAllMoney(value, dataVenchur, middlePercent)

    const calculatingEarning = (value, totalMoney) => {
        const newValue = +(value);
        return totalMoney - newValue;
    }
    const earnings = calculatingEarning(value, totalMoney);
    const currentDatePlus30Days = format(addDays(new Date(), 15), 'dd.MM.yy HH:mm:ss');
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

            <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                Создать депозит
            </button>
        </div>
    );
};