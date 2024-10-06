import Image from "next/image";
import phone from "../../assets/investmentTracker.webp";
import {ArrowRight} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const InviteBlock:React.FC<Props> =({className}) => {
    const t = useTranslations('InviteBlock')
    return (
        <div
            className="flex mt-[25px] items-center flex-row rounded-[20px] justify-center gap-[120px] bg-[radial-gradient(414.19%_201.84%_at_0_131.37%,#76a6fc_0,#aef8d0_69.46%)]">
            <div className="flex flex-col gap-5">
                <h2 className="font-semibold text-black text-[50px]  leading-[43px]">{t('earn-by')}<br/>
                    {t('real-investors')}</h2>
                <p className="text-[20px] text-black font-thin">{t('affiliate-system')}<br/> {t('existing-partners')}</p>
                <div
                    className="flex items-center bg-[#F5F5F5] text-black text-[18px] rounded-[10px] px-4 py-2 w-[205px] gap-2 font-semibold justify-center">
                    {t('invite-earn')}
                    <ArrowRight/>
                </div>
            </div>
            <Image className="pt-[120px]" src={phone} alt="phone"/>
        </div>
    )
}