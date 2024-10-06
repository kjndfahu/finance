'use client'
import {
    CircleDollarSign,
    FileUser,
    History,
    MessageSquareMore,
    Settings,
    ShoppingCart,
    User,
    WalletMinimal
} from "lucide-react";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";

interface Props{
    className?:string;
    locale: string;
}

export const LkNavbar:React.FC<Props> = ({locale, className}) => {
    const t = useTranslations('NavbarLK')
    const pathname = usePathname()

    const isAuthPage = pathname === `/${locale}/registration` || pathname === `/${locale}/login`;

    if (isAuthPage) {
        return null;
    }

    return (
        <div
            className="flex w-[30%] h-[100%] flex-col bg-white gap-2 border-[#f5f5f5] p-3 text-black shadow-xl text-[15px] rounded-[20px]">
            <Link href={`/${locale}/account`}>
                <div
                    className="flex gap-3 items-center bg-white border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]">
                    <User color="#000000"/>
                    <h2>{t('account')}</h2>
                </div>
            </Link>
            <Link href={`/${locale}/topup`}>
                <div
                    className="flex gap-3 items-center bg-white border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]">
                    <WalletMinimal color="#000000"/>
                    <h2>{t('top-up')}</h2>
                </div>
            </Link>
            <Link href={`/${locale}/create-deposit`}>
                <div
                    className="flex gap-3 items-center bg-white border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]">
                    <ShoppingCart color="#000000"/>
                    <h2>{t('create-deposit')}</h2>
                </div>
            </Link>
            <Link href={`/${locale}/withdraw`}>
                <div
                    className="flex gap-3 items-center bg-white border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]">
                    <CircleDollarSign color="#000000"/>
                    <h2>{t('withdraw')}</h2>
                </div>
            </Link>
            <Link href={`/${locale}/operations-history`}>
                <div
                    className="flex gap-3 items-center bg-white border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]">
                    <History color="#000000"/>
                    <h2>{t('transactions')}</h2>
                </div>
            </Link>
            <Link href={`/${locale}/settings`}>
                <div
                    className="flex gap-3 items-center bg-white border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]">
                    <Settings color="#000000"/>
                    <h2>{t('settings')}</h2>
                </div>
            </Link>
            <Link href={`/${locale}/affilate-program`}>
                <div
                    className="flex gap-3 items-center bg-white border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]">
                <FileUser color="#000000"/>
                    <h2>{t('affiliate')}</h2>
                </div>
            </Link>
            <div className="flex gap-3 items-center bg-white border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]">
                <h2>{t('exit')}</h2>
            </div>
        </div>
    )
}