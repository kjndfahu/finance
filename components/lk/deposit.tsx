'use client'
import {CircleDollarSign, WalletMinimal} from "lucide-react";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import Link from "next/link";

interface Props{
    className?:string;
    session:any
}

export const Deposit:React.FC<Props> = ({session, className})=>{
    const t = useTranslations('AccountPersonal')
    const pathame= usePathname()
    const locale = pathame.slice(0,3)
    return (
        <div className="flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <h4 className="text-[#777777]">{t('balance')}</h4>
            <h2 className="text-[32px] font-semibold">${session?.user.balance}</h2>
            <div className="flex gap-5 mt-4">
                <Link href={`${locale}/topup`}>
                    <div
                        className="flex gap-3 items-center px-4 py-2 rounded-[5px] hover:bg-[#f5f5f5]">
                        <WalletMinimal color="#000000"/>
                        <h2>{t('deposit')}</h2>
                    </div>
                </Link>
                <Link href={`${locale}/withdraw`}>
                    <div className="flex gap-3 items-center px-4 py-2 rounded-[5px] hover:bg-[#f5f5f5]">
                        <CircleDollarSign color="#000000"/>
                        <h2>{t('withdraw')}</h2>
                    </div>
                </Link>
            </div>
            <Link href={`${locale}/create-deposit`}>
                <div
                    className="flex items-center justify-center py-2 text-white bg-blue-600 rounded-[10px] w-[50%] mt-3 hover:bg-blue-700">
                    {t('create-deposit')}
                </div>
            </Link>
        </div>
    )
}