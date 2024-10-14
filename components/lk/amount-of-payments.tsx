import {useTranslations} from "next-intl";

interface Props{
    className?:string;
    activeTab:number;
    setTab:any;
}

export const AmountOfPayments:React.FC<Props> = ({activeTab, setTab, className})=>{
    const t = useTranslations('History')
    return (
        <div
            className="flex flex-col gap-3 md:text-[18px] text-[14px] text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <div className="flex md:flex-row flex-col justify-between md:items-center items-start">
                <h4 className="text-[#777777]">{t('amount')}</h4>
                <div className="flex gap-3">
                    <h2 className="md:text-[22px] text-[15px] font-semibold text-green-500">+$4.318,33</h2>
                    <h2 className="md:text-[22px] text-[15px] font-semibold">-$51.675,90</h2>
                </div>
            </div>
            <div
                className="flex flex-row items-center text-[14px] md:w-[25%] px-2 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                <input placeholder="c 05.04.24 до 14.04.24"
                       className="w-[88%] bg-white border-transparent focus:outline-0" type="text"/>
            </div>
            <div className="flex md:w-[50vw] gap-3">
                <div
                    className="flex flex-row items-center text-[14px] md:w-[30%] w-full px-2 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                    <input placeholder="Сумма от"
                           className="w-[88%] bg-white border-transparent focus:outline-0" type="text"/>
                </div>
                <div
                    className="flex flex-row items-center text-[14px] md:w-[30%] w-full px-2 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                    <input placeholder="Сумма до"
                           className="w-[88%] bg-white border-transparent focus:outline-0" type="text"/>
                </div>
            </div>
            <div className="flex w-full justify-between flex-row p-4 gap-5 bg-[#f5f5f5] rounded-[7px]">
                <h3 onClick={() => setTab(1)} className={`${activeTab === 1 ? 'text-black' : 'text-[#777777]'} cursor-pointer`}>{t('all')}</h3>
                <h3 onClick={() => setTab(2)}  className={`${activeTab === 2 ? 'text-black' : 'text-[#777777]'} cursor-pointer`}>{t('deposits')}</h3>
                <h3 onClick={() => setTab(3)}  className={`${activeTab === 3 ? 'text-black' : 'text-[#777777]'} cursor-pointer`}>{t('withdrawal')}</h3>
            </div>
        </div>
    )
}