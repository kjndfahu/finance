
import {ArrowRight} from "lucide-react";
import {AboutImage} from "./aboutimage";
import {useTranslations} from "next-intl";


interface Props{
    className?:string;
}

export const AboutUs:React.FC<Props> = ({className}) => {
    const t = useTranslations("AboutMerit")
    return (
        <div className="flex flex-col gap-16">
            <AboutImage/>
            <div className="flex flex-row justify-between px-[100px] rounded-[20px] py-12 bg-[#F5F5F5] w-full text-black font-semibold text-[32px]">
                <div className="flex flex-col">
                    <h2>500+</h2>
                    <p className="text-[18px] text-[#b0b0b0] font-normal">{t('portfoliostocks')}</p>
                </div>
                <div className="flex flex-col">
                    <h2>110+ </h2>
                    <p className="text-[18px] text-[#b0b0b0] font-normal">{t('venture-deals')}</p>
                </div>
                <div className="flex flex-col">
                    <h2>$700M+</h2>
                    <p className="text-[18px] text-[#b0b0b0] font-normal">{t('trade-turnover')}</p>
                </div>
                <div className="flex items-center px-14 rounded-[10px] flex-row gap-2 bg-white text-[20px]">
                    {t('more-about-us')}
                    <ArrowRight color="#000000"/>
                </div>
            </div>
        </div>
    )
}