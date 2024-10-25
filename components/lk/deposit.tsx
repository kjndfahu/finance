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
            <h4 className="md:text-[18px] text-[14px] text-[#777777]">{t('balance')}</h4>
            <h2 className="md:text-[32px] text-[18px] font-semibold">${session?.user.balance.toFixed(2)}</h2>
            <div className="flex md:gap-5 gap-2 md:mt-4 mt-2">
                <Link href={`${locale}/topup`}>
                    <div
                        className="flex md:gap-3 gap-1 items-center md:px-4 px-1 md:py-2 rounded-[5px] hover:bg-[#f5f5f5]">
                        <WalletMinimal color="#000000"/>
                        <h2 className="md:text-[18px] text-[14px]">{t('deposit')}</h2>
                    </div>
                </Link>
                <Link href={`${locale}/withdraw`}>
                    <div className="flex md:gap-3 gap-1 items-center md:px-4 px-1 md:py-2 rounded-[5px] hover:bg-[#f5f5f5]">
                        <CircleDollarSign color="#000000"/>
                        <h2 className="md:text-[18px] text-[14px]">{t('withdraw')}</h2>
                    </div>
                </Link>
            </div>
            <Link href={`${locale}/create-deposit`}>
                <div
                    className="flex items-center md:text-[18px] text-[14px] justify-center py-2 text-white bg-blue-600 rounded-[10px] w-[50%] mt-3 hover:bg-blue-700">
                    {t('create-deposit')}
                </div>
            </Link>
        </div>
    )
}