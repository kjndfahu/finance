import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const ForPartners:React.FC<Props> = ({className})=>{
    const t = useTranslations('Partners')
    return (
        <div className="flex flex-row items-center justify-between lg:px-[120px] mdbvp:px-[60px] lg:py-[150px] mdbvp:py-[70px] smbvp:px-[30px] px-[10px] py-[20px] bg-[#f3f4eb] mdbvp:rounded-[40px] smbvp:rounded-[10px] rounded-[5px]">
            <div className="flex flex-col mdbvp:gap-5 gap-2">
                <h3 className="text-[#b0b0b0] lg:text-[20px] lg:leading-[20px] mdbvp:text-[15px] mdbvp:leading-[15px] smbvp:text-[12px] text-[10px] font-semibold">{t('partners')}</h3>
                <h2 className="lg:text-[56px] lg:leading-[56px] mdbvp:text-[32px] mdbvp:leading-[32px] smbvp:text-[24px] text-[17px] leading-[17px] smbvp:leading-[24px] font-semibold text-black">{t('invite')}</h2>
                <h4 className="lg:text-[20px] lg:leading-[20px] mdbvp:text-[15px] mdbvp:leading-[15px] smbvp:text-[12px] text-[10px] leading-[10px] smbvp:leading-[12px] text-black">{t('text')}</h4>
            </div>
            <img className="lg:w-[400px] lg:h-[300px] mdbvp:w-[250px] mdbvp:h-[200px] smbvp:w-[170px] smbvp:h-[120px] w-[100px] h-[75px]" src="https://raison.app/_ipx/_/img/referral/affiliate.webp" alt="abstract"/>
        </div>
    )
}