import {useTranslations} from "next-intl";


export const PlannedGreyblock:React.FC = () => {
    const t = useTranslations('PlannedGreyBlock')
    return (
        <div className="flex bg-[#F5F5F5] rounded-[50px] py-[100px] w-full items-center justify-center">
            <div className="flex flex-col gap-5">
                <h2 className="text-[#036AC8] text-[42px] leading-[45px] font-semibold">{t('all-plans')}<br/>{t('with-fixed')}<br/>
                    {t('income')}<span className="text-black"> {t('for')}<br/> {t('projected-profitability')}</span></h2>
                <p className="text-[20px] text-black font-thin">{t('plan-predict')}<br/>
                    {t('income-fixed')}</p>
            </div>
        </div>
    )
}