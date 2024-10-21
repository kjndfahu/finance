'use client'
import {addDays, format} from "date-fns";
import {useState} from "react";
import {ModalDeposit} from "./modal-deposit";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
    dataIPO:number;
    highPercent:string;
    value?:string;
}

export const IPOInfo:React.FC<Props> = ({value = 0, dataIPO,highPercent, className}) => {
    const calculatingAllMoney = (value, highPercent ) => {
        const newPercent = +(highPercent);
        const newValue = +(value);
        return newValue+(newValue/100*newPercent)
    }
    const t = useTranslations('LK')
    const totalMoney = calculatingAllMoney(value, highPercent)
    const [isModalOpen, setModalOpen] = useState(false);
    const calculatingEarning = (value, totalMoney) => {
        const newValue = +(value);
        return totalMoney - newValue;
    }
    const earnings = calculatingEarning(value, totalMoney);
    const currentDatePlus30Days = format(addDays(new Date(), 5), 'dd.MM.yy HH:mm:ss');
    return (
        <div className="w-full mx-auto bg-white rounded-lg md:p-6">
            <h2 className="md:text-lg text-[15px] font-semibold mb-4">
                {t('personalinfodeposit')}
            </h2>

            <div className=" grid grid-cols-3 gap-4 text-left">
                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">{t('exit-amount')}</p>
                    <p className="md:text-2xl text-[18px] font-bold">${totalMoney.toFixed(2)}</p>
                </div>

                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">{t('accrued-profit')}</p>
                    <p className="md:text-2xl text-[18px] font-bold">${earnings.toFixed(2)}</p>
                </div>

                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">{t('end-date')}</p>
                    <p className="md:text-2xl text-[18px] font-bold">{currentDatePlus30Days}</p>
                </div>
            </div>

            <button onClick={() => setModalOpen(true)} className=" md:mt-6 mt-2 w-full md:py-3 py-1 bg-blue-600 md:text-[16px] text-[13px] text-white rounded-lg font-medium hover:bg-blue-700">
                {t('create-deposit')}
            </button>
            {isModalOpen && (<ModalDeposit isModalOpen={isModalOpen} setModalOpen={setModalOpen}/> )}
        </div>
    );
};