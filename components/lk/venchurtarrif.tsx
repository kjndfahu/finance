import {useTranslations} from "next-intl";
import {useState} from "react";

interface Props{
    className?:string;
    setMiddlePercent:any;
}

export const VenchurTarrif:React.FC<Props> = ({setMiddlePercent, className})=>{
    const t = useTranslations('VenchurInfo')
    const [isType, setType] = useState('0')
    return (
        <div className="flex flex-col md:gap-5 gap-2 text-black border-[#f5f5f5] md:px-4 py-2 border-b-[2px]">
            <h4 className="md:text-[16px] text-[13px] text-[#000000]">{t('text')}</h4>
            <div className="flex flex-row md:w-[75%] md:gap-5 gap-1">
                <div onClick={() => {setType('15'); setMiddlePercent('2')}}
                     className={`${isType === '15' ? 'bg-[#f5f5f5]' : 'bg-white'} flex w-full cursor-pointer md:text-[16px] text-[12px] flex-col border-[1px] rounded-[10px] border-[#b0b0b0] gap-2 font-semibold md:px-3 px-1 md:py-4 py-2`}>
                    <h2>{t('latestage')}</h2>
                    <ul className="flex flex-col font-normal list-disc md:px-6 px-4 gap-1">
                        <li>15 {t('days')}</li>
                        <li>2% {t('daily')}</li>
                        <li>$3000-5000</li>
                    </ul>
                </div>
                <div onClick={() => {setType('30');setMiddlePercent('2.5')}}
                     className={`${isType === '30' ? 'bg-[#f5f5f5]' : 'bg-white'} flex w-full cursor-pointer md:text-[16px] text-[12px] flex-col border-[1px] rounded-[10px] border-[#b0b0b0] gap-2 font-semibold md:px-3 px-1 md:py-4 py-2`}>
                    <h2>{t('startup')}</h2>
                    <ul className="flex flex-col font-normal list-disc md:px-6 px-4 gap-1">
                        <li>15 {t('days')}</li>
                        <li>2.5% {t('daily')}</li>
                        <li>$5000-10000</li>
                    </ul>
                </div>
                <div onClick={() => {setType('50');setMiddlePercent('3.1')}}
                     className={`${isType === '50' ? 'bg-[#f5f5f5]' : 'bg-white'} flex w-full cursor-pointer md:text-[16px] text-[12px] flex-col border-[1px] rounded-[10px] border-[#b0b0b0] gap-2 font-semibold md:px-3 px-1 md:py-4 py-2`}>
                    <h2>{t('posev')}</h2>
                    <ul className="flex flex-col font-normal list-disc md:px-6 px-4 gap-1">
                        <li>15 {t('days')}</li>
                        <li>3.1% {t('daily')}</li>
                        <li>$10000-50000</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}