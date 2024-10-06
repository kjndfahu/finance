import Image from "next/image";
import phone from "../../assets/investmentTracker.webp";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const PrivateMarketsAbout:React.FC<Props> = ({className}) => {
    const t = useTranslations('PrivateMarketsAbout')
    return (
        <div
            className="flex mt-[25px] items-center flex-row rounded-[20px] justify-center gap-[150px] bg-[#E7FAFD]">
            <div className="flex flex-col gap-7">
                <h4 className="text-[20px] font-semibold text-[#b0b0b0]">{t('private')}</h4>
                <h2 className="font-semibold text-black text-[65px] leading-[68px]">{t('invest')}<br/>{t('in-private')}<br/> {t('startups')}<br/> {t('all-stages')}</h2>
                <p className="text-[20px] text-black font-thin">{t('text')}<br/> {t('of-investors')}<br/> {t('venture-fund')}</p>
                <div
                    className="flex items-center bg-[#15B0DB] rounded-[10px] w-[150px] py-2 px-7 font-semibold justify-center text-white">{t('login')}
                </div>
            </div>
            <Image className="pt-[120px]" src={phone} alt="phone"/>
        </div>
    )
}