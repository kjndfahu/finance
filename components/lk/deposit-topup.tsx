import { useTranslations } from "next-intl";

interface Props {
    className?: string;
    session: any;
    balance:any;
}

export const DepositTopUp: React.FC<Props> = ({balance, session, className }) => {
    const t = useTranslations("CreateDeposit");


    return (
        <div className="flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <h4 className="md:text-[18px] text-[14px] text-[#777777]">{t('balance')}</h4>
            <h2 className="md:text-[32px] text-[18px] font-semibold">
                ${balance.toFixed(2)}
            </h2>
        </div>
    );
};
