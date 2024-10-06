import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const AmountOfPayments:React.FC<Props> = ({className})=>{
    const t = useTranslations('History')
    return (
        <div
            className="flex flex-col gap-3 text-[18px] text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <div className="flex justify-between items-center">
                <h4 className="text-[#777777]">{t('amount')}</h4>
                <div className="flex gap-3">
                    <h2 className="text-[22px] font-semibold text-green-500">+$4.318,33</h2>
                    <h2 className="text-[22px] font-semibold">-$51.675,90</h2>
                </div>
            </div>
            <div
                className="flex flex-row items-center text-[14px] w-[25%] px-2 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                <input placeholder="c 05.04.24 до 14.04.24"
                       className="w-[88%] bg-white border-transparent focus:outline-0" type="text"/>
            </div>
            <div className="flex w-[50vw] gap-3">
                <div
                    className="flex flex-row items-center text-[14px] w-[30%] px-2 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                    <input placeholder="Сумма от"
                           className="w-[88%] bg-white border-transparent focus:outline-0" type="text"/>
                </div>
                <div
                    className="flex flex-row items-center text-[14px] w-[30%] px-2 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                    <input placeholder="Сумма до"
                           className="w-[88%] bg-white border-transparent focus:outline-0" type="text"/>
                </div>
            </div>
            <div className="flex flex-row p-4 gap-5 bg-[#f5f5f5] rounded-[7px]">
                <h3>{t('all')}</h3>
                <h3>{t('deposits')}</h3>
                <h3>{t('withdrawal')}</h3>
            </div>
        </div>
    )
}