
import {ArrowRight} from "lucide-react";
import {AboutImage} from "./aboutimage";
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";


interface Props{
    className?:string;
    session:any;
}

export const AboutUs:React.FC<Props> = ({session, className}) => {
    const t = useTranslations("AboutMerit")
    return (
        <div className="flex flex-col xl:gap-16 gap-8">
            <AboutImage session={session}/>
            <div className="flex mdbvp:flex-row mdbvp:gap-0 gap-5 flex-col justify-between xl:px-[100px] px-[50px] rounded-[20px] xl:py-12 py-8 bg-[#F5F5F5] w-full text-black font-semibold xl:text-[32px] text-[25px]">
                <div className="flex flex-col text-center mdbvp:text-left">
                    <h2>500+</h2>
                    <p className="xl:text-[18px] text-[15px] text-[#b0b0b0] font-normal">{t('portfoliostocks')}</p>
                </div>
                <div className="flex flex-col text-center mdbvp:text-left">
                    <h2>110+ </h2>
                    <p className="xl:text-[18px] text-[15px] text-[#b0b0b0] font-normal">{t('venture-deals')}</p>
                </div>
                <div className="flex flex-col text-center mdbvp:text-left">
                    <h2>$700M+</h2>
                    <p className="xl:text-[18px] text-[15px] text-[#b0b0b0] font-normal">{t('trade-turnover')}</p>
                </div>
                <div className="flex justify-center mdbvp:py-0 py-3 items-center xl:px-14 px-8 rounded-[10px] flex-row gap-2 bg-white xl:text-[20px] mdbvp:text-[15px] text-[13px]">
                    {t('more-about-us')}
                    <ArrowRight className="mdbvp:w-[20px] w-[12px ]" color="#000000"/>
                </div>
            </div>
        </div>
    )
}