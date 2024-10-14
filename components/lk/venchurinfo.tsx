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
        <div className="w-full mx-auto bg-white rounded-lg md:p-6">
            <h2 className="md:text-lg text-[15px] font-semibold mb-4">
                Персональная информация по депозиту
            </h2>

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
                    <p className="md:text-2xl text-[18px] font-bold">{currentDatePlus30Days}</p>
                </div>
            </div>

            <button className="md:mt-6 mt-2 w-full md:py-3 py-1 bg-blue-600 md:text-[16px] text-[13px] text-white rounded-lg font-medium hover:bg-blue-700">
                Создать депозит
            </button>
        </div>
    );
};