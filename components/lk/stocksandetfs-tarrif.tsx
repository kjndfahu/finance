import {useTranslations} from "next-intl";
import {useState} from "react";

interface Props{
    className?:string;
    setPercent:any;
    dataStocks:number;
}

export const StocksAndETFsTarrif:React.FC<Props> = ({dataStocks,  setPercent, className})=>{
    const t = useTranslations('History')
    const [isType, setType] = useState('0')
    return (
        <div className="flex flex-col gap-5 text-black border-[#f5f5f5] px-4 py-2 border-b-[2px]">
            <h4 className="text-[16px] text-[#000000]">Акции и ETF - срок работы 30 дней, прибыль начисляется ежедневно, сумма инвестиций приходит в последний день депозита.</h4>
            <div className="flex flex-row w-[75%] gap-5">
                <div onClick={() => {setType('15'); setPercent('0.9')}}
                     className={`${isType === '15' ? 'bg-[#f5f5f5]' : 'bg-white'} flex w-full cursor-pointer flex-col border-[1px] rounded-[10px] border-[#b0b0b0] gap-2 font-semibold px-3 py-4`}>
                    <h2>Индекс на 15 акций</h2>
                    <ul className="flex flex-col font-normal list-disc px-6 gap-1">
                        <li>{dataStocks} дней</li>
                        <li>0.9% ежедневно</li>
                        <li>$100-1000</li>
                    </ul>
                </div>
                <div onClick={() => {setType('30'); setPercent('1.3')}}
                     className={`${isType === '30' ? 'bg-[#f5f5f5]' : 'bg-white'} flex w-full cursor-pointer flex-col border-[1px] rounded-[10px] border-[#b0b0b0] gap-2 font-semibold px-3 py-4`}>
                    <h2>Индекс на 30 акций</h2>
                    <ul className="flex flex-col font-normal list-disc px-6 gap-1">
                        <li>{dataStocks} дней</li>
                        <li>1.3% ежедневно</li>
                        <li>$1000-2000</li>
                    </ul>
                </div>
                <div onClick={() => {setType('50'); setPercent('1.7')}}
                     className={`${isType === '50' ? 'bg-[#f5f5f5]' : 'bg-white'} flex w-full cursor-pointer flex-col border-[1px] rounded-[10px] border-[#b0b0b0] gap-2 font-semibold px-3 py-4`}>
                    <h2>Индекс на 50 акций</h2>
                    <ul className="flex flex-col font-normal list-disc px-6 gap-1">
                        <li>{dataStocks} дней</li>
                        <li>1.7% ежедневно</li>
                        <li>$2000-3000</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}