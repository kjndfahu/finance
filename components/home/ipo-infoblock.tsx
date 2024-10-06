import Image from "next/image";
import phone from "../../assets/investmentTracker.webp";
import {ArrowRight} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const IpoInfoblock:React.FC<Props> =({className}) => {
    const t = useTranslations('IpoInfoblock')
    return (
        <div
            className="flex mt-[25px] items-center flex-row rounded-[20px] justify-center gap-[120px] bg-[radial-gradient(92.69%_165.02%_at_6.28%_100%,#a584ff_0,rgba(165,132,255,0)_100%),radial-gradient(201%_141.42%_at_100%_0,#d8fffc_0,#81fef3_100%)]">
            <div className="flex flex-col gap-5">
                <h2 className="font-semibold text-black text-[50px]  leading-[43px]">{t('earnings-ipo')}<br/> {t('available')}</h2>
                <p className="text-[20px] text-black font-thin">{t('prof-investor')}<br/> {t('make-money')}</p>
                <div
                    className="flex items-center bg-[#F5F5F5] text-black text-[18px] rounded-[10px] py-2 w-[175px] gap-2 font-semibold justify-center">
                    {t('learn-more')}
                    <ArrowRight/>
                </div>
            </div>
            <Image className="pt-[120px]" src={phone} alt="phone"/>
        </div>
    )
}