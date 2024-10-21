import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const ForPartners:React.FC<Props> = ({className})=>{
    const t = useTranslations('Partners')
    return (
        <div className="flex md:flex-row flex-col items-center justify-between lg:px-[120px] mdbvp:px-[60px] lg:py-[150px] mdbvp:py-[70px] smbvp:px-[30px] px-[10px] py-[20px] bg-[#f3f4eb] mdbvp:rounded-[40px] smbvp:rounded-[10px] rounded-[5px]">
            <div className="flex flex-col md:items-start items-center md:text-left text-center mdbvp:gap-5 gap-3 md:pt-0 pt-[30px]">
                <h3 className="text-[#b0b0b0] lg:text-[20px] lg:leading-[20px] text-[15px] leading-[15px] font-semibold">{t('partners')}</h3>
                <h2 className="lg:text-[56px] lg:leading-[56px] mdbvp:text-[32px] mdbvp:leading-[32px] text-[24px] leading-[24px] font-semibold text-black">{t('invite')}</h2>
                <h4 className="lg:text-[20px] lg:leading-[20px] text-[15px] leading-[15px] text-black">{t('text')}</h4>
            </div>
            <img className="lg:w-[400px] lg:h-[300px] mdbvp:w-[250px] mdbvp:h-[200px] w-[170px] h-[140px] md:mt-0 mt-[50px]" src="https://raison.app/_ipx/_/img/referral/affiliate.webp" alt="abstract"/>
        </div>
    )
}