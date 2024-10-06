import {ArrowRight} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props{
    className?:string
}

export const IndexGreyblock:React.FC<Props> = ({className})=>{
    const t = useTranslations('IndexGreyBlock')
    return (
        <div className="flex bg-[#F5F5F5] rounded-[50px] py-[100px] w-full items-center justify-center">
            <div className="flex flex-col gap-5">
                <h2 className="text-black text-[42px] leading-[45px] font-semibold">{t('invest-in')}<br/> <span className="text-[#07B1B6]">{t('ready-made')}<br/> {t('indexes')}</span>.</h2>
                <p className="text-[20px] text-black font-thin">{t('designed-indices')}<br/> {t('market-conditions')}</p>
                <div className="flex items-center text-black text-[18px] rounded-[10px] py-2 w-[175px] gap-2 font-semibold justify-center border-[1px] border-black">
                    {t('learn-more')}
                    <ArrowRight/>
                </div>
            </div>
        </div>
    )
}