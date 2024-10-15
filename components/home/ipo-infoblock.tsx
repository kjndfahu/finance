import Image from "next/image";
import phone from "../../public/assets/investmentTracker.webp";
import {ArrowRight} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const IpoInfoblock:React.FC<Props> =({className}) => {
    const t = useTranslations('IpoInfoblock')
    return (
        <div
            className="flex mt-[25px] items-center flex-row rounded-[20px] justify-center md:px-10 px-3 mdbvp:gap-[120px] gap-0 bg-[radial-gradient(92.69%_165.02%_at_6.28%_100%,#a584ff_0,rgba(165,132,255,0)_100%),radial-gradient(201%_141.42%_at_100%_0,#d8fffc_0,#81fef3_100%)]">
            <div className="flex flex-col md:gap-5 gap-2">
                <h2 className="font-semibold text-black mdbvp:text-[50px] mdbvp:leading-[43px] md:text-[32px] md:leading-[32px] text-[18px] leading-[18px]">{t('earnings-ipo')}<br/> {t('available')}</h2>
                <p className="mdbvp:text-[20px] mdbvp:leading-[20px] md:text-[15px] md:leading-[15px] text-[12px] leading-[12px] text-black font-thin">{t('prof-investor')}<br/> {t('make-money')}</p>
                <div
                    className="flex items-center bg-[#F5F5F5] md:text-[18px] text-[10px] rounded-[10px] md:px-4 px-2 md:py-2 py-1 md:w-[205px] w-[120px] text-black gap-2 font-semibold justify-center">
                    {t('learn-more')}
                    <ArrowRight className="md:w-[24px] w-[13px]"/>
                </div>
            </div>
            <Image className="mdbvp:pt-[120px] md:pt-[70px] pt-[40px] mdbvp:w-[420px] md:w-[250px] w-[150px]" src={phone} alt="phone"/>
        </div>
    )
}