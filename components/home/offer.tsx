import {Trackerblock} from "./trackerblock";
import {useTranslations} from "next-intl";



interface Props{
    className?:string;
}

export const Offer:React.FC<Props> =({className}) => {
    const t = useTranslations('Offer')
    return (
        <div className="md:mt-[100px] mt-[30px]">
            <div className="flex flex-col md:gap-5 gap-2 text-center">
                <h3 className="text-[#b0b0b0] md:text-[22px] text-[17px] md:leading-[22px] leading-[17px]  font-semibold">{t('what-we-offer')}</h3>
                <h2 className="text-black md:text-[48px] text-[28px] md:leading-[48px] leading-[28px] font-semibold">{t('unique-set')}<br/> {t('investment-solutions')}</h2>
                <p className="text-black md:text-[20px] text-[14px] md:leading-[20px] leading-[14px] font-thin">{t('personalized-approach')}</p>
            </div>
            <Trackerblock/>
        </div>
    )
}