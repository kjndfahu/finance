import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const ForPartners:React.FC<Props> = ({className})=>{
    const t = useTranslations('Partners')
    return (
        <div className="flex flex-row items-center justify-between px-[120px] py-[75px] bg-[#F5F5F5] rounded-[40px]">
            <div className="flex flex-col gap-5">
                <h3 className="text-[#b0b0b0] text-[20px] font-semibold">{t('partners')}</h3>
                <h2 className="text-[56px] leading-[56px] font-semibold text-black">{t('invite')}</h2>
                <h4 className="text-[20px] text-black">{t('text')}</h4>
            </div>
            <img className="w-[500px]" src="https://raison.app/_ipx/_/img/referral/affiliate.webp" alt="abstract"/>
        </div>
    )
}