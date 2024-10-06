import Image from "next/image";
import phone from "@/assets/investmentTracker.webp";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const InvestIPOAbout:React.FC<Props> = ({className}) => {
    const t = useTranslations('InvestIPOAbout')
    return (
        <div
            className="flex mt-[50px] items-center flex-row rounded-[20px] justify-center gap-[150px] bg-[#E7FAFD]">
            <div className="flex flex-col gap-7">
                <h4 className="text-[20px] font-semibold text-[#b0b0b0]">IPO</h4>
                <h2 className="font-semibold text-black text-[65px] leading-[68px]">{t('title1')}<br/> {t('title2')}</h2>
                <p className="text-[20px] text-black font-thin">{t('text1')}</p>
                <div
                    className="flex items-center bg-[#15B0DB] rounded-[10px] w-[150px] py-2 px-7 font-semibold justify-center text-white">
                    {t('btn')}
                </div>
            </div>
            <img className="py-[120px] w-[400px]" src="https://raison.app/_ipx/_/img/stocksEtf/growth.png" alt="phone"/>
        </div>
    )
}