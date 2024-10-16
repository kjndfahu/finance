import Image from "next/image";
import phone from "../../public/assets/investmentTracker.webp";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const PrivateMarketsAbout:React.FC<Props> = ({className}) => {
    const t = useTranslations('PrivateMarketsAbout')
    return (
        <div
            className="flex mdbvp:mt-[75px] mt-[30px] items-center flex-row rounded-[20px] justify-center mdbvp:gap-[120px] gap-2 mdbvp:px-0 md:px-10 px-3 bg-[#E7FAFD]">
            <div className="flex flex-col md:gap-5 gap-2">
                <h4 className="mdbvp:text-[20px] smbvp:text-[15px] text-[12px] font-semibold text-[#b0b0b0]">{t('private')}</h4>
                <h2 className="font-semibold text-black mdbvp:text-[50px] mdbvp:leading-[43px] md:text-[32px] md:leading-[32px] text-[17px] leading-[17px]">{t('invest')}<br/>{t('in-private')}<br/> {t('startups')}<br/> {t('all-stages')}</h2>
                <p className="mdbvp:text-[20px] mdbvp:leading-[20px] md:text-[15px] md:leading-[15px] text-[10px] leading-[10px] text-black font-thin">{t('text')}<br/> {t('of-investors')}<br/> {t('venture-fund')}</p>
                <div
                    className="flex items-center bg-[#15B0DB] lg:text-[18px] lg:leading-[18px] mdbvp:text-[15px] mdbvp:leading-[15px] text-[12px] leading-[12px] mdbvp:rounded-[10px] rounded-[3px] lg:w-[150px] mdbvp:w-[120px] w-[80px] mdbvp:py-2 py-1 mdbvp:px-7 px-3 font-semibold justify-center text-white">{t('login')}
                </div>
            </div>
            <Image className="mdbvp:pt-[120px] md:pt-[70px] pt-[40px] mdbvp:w-[420px] md:w-[250px] w-[150px]" src={phone} alt="phone"/>
        </div>
    )
}