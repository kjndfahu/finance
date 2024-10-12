'use client'
import {
    CircleDollarSign,
    FileUser,
    History,
    Settings,
    ShoppingCart,
    User,
    WalletMinimal
} from "lucide-react";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import {useState} from "react";

interface Props{
    className?:string;
    locale: string;
}

export const LkNavbar:React.FC<Props> = ({locale, className}) => {
    const [tab, setTab] = useState('account')
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
                    onClick={() => setTab('account')}
                    className={`${tab === 'account' ? 'bg-black' : 'bg-white'} flex gap-3 items-center border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]`}>
                    {tab==='account' ? (
                            <div className="flex gap-3">
                                <User color="#ffffff"/>
                                <h2 className="text-[#ffffff]">{t('account')}</h2>
                            </div>
                        ) :
                            (
                        <div className="flex gap-3">
                            <User color="#000000"/>
                            <h2>{t('account')}</h2>
                        </div>
                    )}
                </div>
            </Link>
            <Link href={`/${locale}/topup`}>
                <div
                    onClick={() => setTab('topup')}
                    className={`${tab==='topup' ? 'bg-black' : 'bg-white'} flex gap-3 items-center border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]`}>
                    {tab==='topup' ? (
                            <div className="flex gap-3">
                                <WalletMinimal color="#ffffff"/>
                                <h2 className="text-[#ffffff]">{t('top-up')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex gap-3">
                                <WalletMinimal color="#000000"/>
                                <h2>{t('top-up')}</h2>
                            </div>
                        )}
                </div>
            </Link>
            <Link href={`/${locale}/create-deposit`}>
                <div
                    onClick={() => setTab('create-deposit')}
                    className={`${tab==='create-deposit' ? 'bg-[#000000]' : 'bg-white'} flex gap-3 items-center border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]`}>
                    {tab==='create-deposit' ? (
                            <div className="flex gap-3">
                                <ShoppingCart color="#ffffff"/>
                                <h2 className="text-[#ffffff]">{t('create-deposit')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex gap-3">
                                <ShoppingCart color="#000000"/>
                                <h2>{t('create-deposit')}</h2>
                            </div>
                        )}
                </div>
            </Link>
            <Link href={`/${locale}/withdraw`}>
                <div
                    onClick={() => setTab('withdraw')}
                    className={`${tab==='withdraw' ? 'bg-[#000000]' : 'bg-white'} flex gap-3 items-center border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]`}>
                    {tab==='withdraw' ? (
                            <div className="flex gap-3">
                                <CircleDollarSign color="#ffffff"/>
                                <h2 className="text-[#ffffff]">{t('withdraw')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex gap-3">
                                <CircleDollarSign color="#000000"/>
                                <h2>{t('withdraw')}</h2>
                            </div>
                        )}
                </div>
            </Link>
            <Link href={`/${locale}/operations-history`}>
                <div
                    onClick={() => setTab('operations-history')}
                    className={`${tab==='operations-history' ? 'bg-[#000000]' : 'bg-white'} flex gap-3 items-center border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]`}>
                    {tab==='operations-history' ? (
                            <div className="flex gap-3">
                                <History color="#ffffff"/>
                                <h2 className="text-[#ffffff]">{t('transactions')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex gap-3">
                                <History color="#000000"/>
                                <h2>{t('transactions')}</h2>
                            </div>
                        )}
                </div>
            </Link>
            <Link href={`/${locale}/settings`}>
                <div
                    onClick={() => setTab('settings')}
                    className={`${tab==='settings' ? 'bg-[#000000]' : 'bg-white'} flex gap-3 items-center border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]`}>
                    {tab==='settings' ? (
                            <div className="flex gap-3">
                                <Settings color="#ffffff"/>
                                <h2 className="text-[#ffffff]">{t('settings')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex gap-3">
                                <Settings color="#000000"/>
                                <h2>{t('settings')}</h2>
                            </div>
                        )}

                </div>
            </Link>
            <Link href={`/${locale}/affilate-program`}>
                <div
                    onClick={() => setTab('affilate-program')}
                    className={`${tab==='affilate-program' ? 'bg-[#000000]' : 'bg-white'} flex gap-3 items-center border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]`}>
                    {tab==='affilate-program' ? (
                            <div className="flex gap-3">
                                <FileUser color="#ffffff"/>
                                <h2 className="text-[#ffffff]">{t('affiliate')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex gap-3">
                                <FileUser color="#000000"/>
                                <h2>{t('affiliate')}</h2>
                            </div>
                        )}

                </div>
            </Link>
            <div className="flex gap-3 items-center bg-white border-[2px] px-7 py-2 border-[#f5f5f5] rounded-[10px]">
                <h2>{t('exit')}</h2>
            </div>
        </div>
    )
}