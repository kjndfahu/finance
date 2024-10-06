import {CircleDollarSign, WalletMinimal} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const Deposit:React.FC<Props> = ({className})=>{
    const t = useTranslations('AccountPersonal')
    return (
        <div className="flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <h4 className="text-[#777777]">{t('balance')}</h4>
            <h2 className="text-[32px] font-semibold">$4.318,33</h2>
            <div className="flex gap-7 mt-4">
                <div
                    className="flex gap-3 items-center">
                    <WalletMinimal color="#000000"/>
                    <h2>{t('deposit')}</h2>
                </div>
                <div className="flex gap-3 items-center">
                    <CircleDollarSign color="#000000"/>
                    <h2>{t('withdraw')}</h2>
                </div>
            </div>
            <div className="flex items-center justify-center py-2 text-white bg-blue-600 rounded-[10px] w-[50%] mt-3">{t('create-deposit')}</div>
        </div>
    )
}