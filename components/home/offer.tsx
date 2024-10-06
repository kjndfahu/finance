import {Trackerblock} from "./trackerblock";
import {useTranslations} from "next-intl";



interface Props{
    className?:string;
}

export const Offer:React.FC<Props> =({className}) => {
    const t = useTranslations('Offer')
    return (
        <div className="mt-[100px]">
            <div className="flex flex-col gap-5 text-center">
                <h3 className="text-[#b0b0b0] text-[22px] font-semibold">{t('what-we-offer')}</h3>
                <h2 className="text-black text-[48px] leading-[48px] font-semibold">{t('unique-set')}<br/> {t('investment-solutions')}</h2>
                <p className="text-black text-[20px] font-thin">{t('personalized-approach')}</p>
            </div>
            <Trackerblock/>
        </div>
    )
}