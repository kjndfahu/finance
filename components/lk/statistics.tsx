import {ChevronDown} from "lucide-react";
import {Graphics} from "./graphics";
import {Transactions} from "./transactions";
import {HistoryOfDeposits} from "./history-of-deposits";
import {useTranslations} from "next-intl";

interface Props {
    className?: string;
}

export const Statistics:React.FC<Props> = ({ className }) => {
    const t = useTranslations('AccountPersonal')
    return (
        <div className="flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <div className="flex justify-between">
                <h3>{t('statistics')}</h3>
                <ChevronDown color="#000000"/>
            </div>
            <Graphics/>
            <Transactions/>
            <HistoryOfDeposits/>
        </div>
    )
}