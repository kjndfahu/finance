import {useTranslations} from "next-intl";
import {Minus, Plus} from "lucide-react";

interface Props{
    className?:string;
}

export const WithdrawHistory:React.FC<Props> = ({className})=>{
    const t = useTranslations('History')
    return (
        <div className="flex flex-col gap-5 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px]">
            <h4 className="text-[18px] text-[#777777]">{t('transaction-history')}</h4>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center border-b-[1px] py-3 border-[#b0b0b0] justify-between">
                    <div className="flex flex-row gap-3">
                        <div className="flex items-center justify-center bg-[#f5f5f5] w-[85px] h-[85px] rounded-full">
                            <Minus width={30} height={30}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[19px]">{t('deposit')}</h1>
                            <h3 className="text-[#b0b0b0]">24 июня 2022 в 15:33</h3>
                        </div>
                    </div>
                    <h2 className="font-semibold text-[21px]">-$2.333,30</h2>
                </div>
                <div className="flex flex-row items-center border-b-[1px] py-3 border-[#b0b0b0] justify-between">
                    <div className="flex flex-row gap-3">
                        <div className="flex items-center justify-center bg-[#f5f5f5] w-[85px] h-[85px] rounded-full">
                            <Minus width={30} height={30}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[19px]">{t('deposit')}</h1>
                            <h3 className="text-[#b0b0b0]">24 июня 2022 в 15:33</h3>
                        </div>
                    </div>
                    <h2 className="font-semibold text-[21px]">-$2.333,30</h2>
                </div>
                <div className="flex flex-row items-center border-b-[1px] py-3 border-[#b0b0b0] justify-between">
                    <div className="flex flex-row gap-3">
                        <div className="flex items-center justify-center bg-[#f5f5f5] w-[85px] h-[85px] rounded-full">
                            <Minus width={30} height={30}/>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[19px]">{t('deposit')}</h1>
                            <h3 className="text-[#b0b0b0]">24 июня 2022 в 15:33</h3>
                        </div>
                    </div>
                    <h2 className="font-semibold text-[21px]">-$2.333,30</h2>
                </div>
            </div>
        </div>
    )
}