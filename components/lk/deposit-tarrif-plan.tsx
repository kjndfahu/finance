import {useTranslations} from "next-intl";

interface Props {
    className?: string;
}

export const DepositTarrifPlan: React.FC<Props> = ({className}) => {
    const t = useTranslations("CreateDeposit")
    return (
        <div className="flex flex-col gap-5 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px]">
            <h4 className="text-[18px] text-black">{t('tariff-plan')}</h4>
            <p className="text-[16px] text-[#777777]">{t('text')}</p>
        </div>
    )
}