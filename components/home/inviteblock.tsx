import Image from "next/image";
import phone from "../../public/assets/secondscreen.png";
import {ArrowRight} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const InviteBlock:React.FC<Props> =({className}) => {
    const t = useTranslations('InviteBlock')
    return (
        <div
            className="flex mt-[25px] items-center flex-row rounded-[20px] justify-center md:px-10 px-3 mdbvp:gap-[120px] gap-0 bg-[radial-gradient(414.19%_201.84%_at_0_131.37%,#76a6fc_0,#aef8d0_69.46%)]">
            <div className="flex flex-col md:gap-5 gap-2">
                <h2 className="font-semibold text-black mdbvp:text-[50px] mdbvp:leading-[43px] md:text-[32px] md:leading-[32px] text-[18px] leading-[18px]">{t('earn-by')}<br/>
                    {t('real-investors')}</h2>
                <p className="mdbvp:text-[20px] mdbvp:leading-[20px] md:text-[15px] md:leading-[15px] text-[12px] leading-[12px] text-black font-thin">{t('affiliate-system')}<br/> {t('existing-partners')}</p>
                <div
                    className="flex items-center bg-[#F5F5F5] text-black md:text-[18px] text-[10px] rounded-[10px] md:px-4 px-2 md:py-2 py-1 md:w-[205px] w-[120px] gap-2 font-semibold justify-center">
                    {t('invite-earn')}
                    <ArrowRight className="md:w-[24px] w-[13px]"/>
                </div>
            </div>
            <Image className="mdbvp:pt-[120px] md:pt-[70px] pt-[40px] mdbvp:w-[420px] md:w-[250px] w-[150px]" src={phone} alt="phone"/>
        </div>
    )
}