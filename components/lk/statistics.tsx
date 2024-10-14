import {ChevronDown} from "lucide-react";
import {Graphics} from "./graphics";
import {Transactions} from "./transactions";
import {HistoryOfDeposits} from "./history-of-deposits";
import {useTranslations} from "next-intl";
import {session} from "next-auth/core/routes";

interface Props {
    className?: string;
    session:any;
}

export const Statistics:React.FC<Props> = ({ className,session }) => {
    const t = useTranslations('AccountPersonal')
    return (
        <div className="flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] md:p-4 p-2 rounded-[10px]">
            <div className="flex justify-between">
                <h3>{t('statistics')}</h3>
                {/*<ChevronDown color="#000000"/>*/}
            </div>
            {/*<Graphics/>*/}
            {/*<Transactions/>*/}
            <HistoryOfDeposits session={session}/>
        </div>
    )
}