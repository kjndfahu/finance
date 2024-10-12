import {useTranslations} from "next-intl";
import {useState} from "react";

interface Props{
    className?:string;
    setHighPercent:any;
}

export const IPOTarffif:React.FC<Props> = ({setHighPercent, className})=>{
    const t = useTranslations('History')
    const [isType, setType] = useState('0')
    return (
        <div className="flex flex-col gap-5 text-black border-[#f5f5f5] px-4 py-2 border-b-[2px]">
            <h4 className="text-[16px] text-[#000000]">IPO публичный рынок - Срок работы 5 дней, прибыль начисляется в конце срока работы депозита вместе с инвестицией.</h4>
            <div className="flex flex-row w-[75%] gap-5">
                <div onClick={() => {setType('15');setHighPercent('50')}}
                     className={`${isType === '15' ? 'bg-[#f5f5f5]' : 'bg-white'} flex w-full cursor-pointer flex-col border-[1px] rounded-[10px] border-[#b0b0b0] gap-2 font-semibold px-3 py-4`}>
                    <h2>Индивидуальное участие</h2>
                    <ul className="flex flex-col font-normal list-disc px-6 gap-1">
                        <li>5 дней</li>
                        <li>от 46% до 70%</li>
                        <li>$15000-150000</li>
                    </ul>
                </div>
                <div onClick={() => setType('30')}
                     className={`${isType === '30' ? 'bg-[#f5f5f5]' : 'bg-white'} flex w-full cursor-pointer flex-col border-[1px] rounded-[10px] border-[#b0b0b0] gap-2 font-semibold px-3 py-4`}>
                    <h2>Участие звеном</h2>
                    <h2 className="text-blue-500">Связаться с поддержкой</h2>
                </div>
            </div>
        </div>
    )
}