import {useTranslations} from "next-intl";

interface Props{
    className?:string;
    session:any;
}

export const DepositTopUp:React.FC<Props> = ({session, className})=>{
    const t = useTranslations("CreateDeposit")
    return (
        <div className="flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <h4 className="text-[#777777]">{t('balance')}</h4>
            <h2 className="text-[32px] font-semibold">${session?.user.balance}</h2>
        </div>
    )
}