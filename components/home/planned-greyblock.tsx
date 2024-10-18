import {useTranslations} from "next-intl";


export const PlannedGreyblock:React.FC = () => {
    const t = useTranslations('PlannedGreyBlock')
    return (
        <div className="flex bg-[#F5F5F5] md:rounded-[50px] rounded-[20px] md:py-[100px] py-[30px] w-full items-center justify-center">
            <div className="flex flex-col gap-5">
                <h2 className="text-[#036AC8] md:text-[42px] text-[24px] leading-[24px] md:leading-[45px] font-semibold">{t('all-plans')}<br/>{t('with-fixed')}<br/>
                    {t('income')}<span className="text-black"> {t('for')}<br/> {t('projected')}<br/>{t('profitability')}</span></h2>
                <p className="md:text-[20px] md:leading-[20px] smbvp:text-[15px] smbvp:leading-[15px] text-[13px] leading-[13px] text-black font-thin">{t('plan-predict')}<br/>
                    {t('income-fixed')}</p>
            </div>
        </div>
    )
}