'use client'
import {
    CircleDollarSign,
    FileUser,
    History, MessageSquareMore,
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
    console.log(`${locale}`)
    console.log(pathname)
    const isAuthPage = pathname === `/${locale}/registration` || pathname === `/${locale}/login`;
    if (isAuthPage) {
        return null;
    }


    return (
        <div
            className="flex md:w-[30%] w-full h-[100%] md:justify-center justify-between md:flex-col flex-row bg-white md:gap-2 gap-0 border-[#f5f5f5] md:p-3 p-1 text-black shadow-xl lg:text-[15px] md:text-[13px] text-[12px] md:rounded-[10px] rounded-[3px]">
            <Link href={`/${locale}/account`}>
                <div
                    onClick={() => setTab('account')}
                    className={`${pathname===`/${locale}/account` ? 'bg-black' : 'bg-white'} flex gap-3 items-center border-[2px] md:px-7 px-3 py-2 border-[#f5f5f5] md:rounded-[10px] rounded-[3px]`}>
                    {pathname===`/${locale}/account` ? (
                            <div className="flex md:gap-3 gap-1">
                                <User className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#ffffff"/>
                                <h2 className="md:flex hidden text-[#ffffff]">{t('account')}</h2>
                            </div>
                        ) :
                            (
                        <div className="flex md:gap-3 gap-1">
                            <User className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#000000"/>
                            <h2 className="md:flex hidden">{t('account')}</h2>
                        </div>
                    )}
                </div>
            </Link>
            <Link href={`/${locale}/topup`}>
                <div
                    onClick={() => setTab('topup')}
                    className={`${pathname===`/${locale}/topup` ? 'bg-black' : 'bg-white'} flex gap-3 items-center border-[2px] md:px-7 px-3 py-2 border-[#f5f5f5] md:rounded-[10px] rounded-[3px]`}>
                    {pathname===`/${locale}/topup` ? (
                            <div className="flex md:gap-3 gap-1">
                                <WalletMinimal className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#ffffff"/>
                                <h2 className="md:flex hidden text-[#ffffff]">{t('top-up')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex md:gap-3 gap-1">
                                <WalletMinimal className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#000000"/>
                                <h2 className="md:flex hidden">{t('top-up')}</h2>
                            </div>
                        )}
                </div>
            </Link>
            <Link href={`/${locale}/create-deposit`}>
                <div
                    onClick={() => setTab('create-deposit')}
                    className={`${pathname===`/${locale}/create-deposit` ? 'bg-[#000000]' : 'bg-white'} flex gap-3 items-center border-[2px] md:px-7 px-3 py-2 border-[#f5f5f5] md:rounded-[10px] rounded-[3px]`}>
                    {pathname===`/${locale}/create-deposit` ? (
                            <div className="flex md:gap-3 gap-1">
                                <ShoppingCart className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#ffffff"/>
                                <h2 className="md:flex hidden text-[#ffffff]">{t('create-deposit')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex md:gap-3 gap-1">
                                <ShoppingCart className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#000000"/>
                                <h2 className="md:flex hidden">{t('create-deposit')}</h2>
                            </div>
                        )}
                </div>
            </Link>
            <Link href={`/${locale}/withdraw`}>
                <div
                    onClick={() => setTab('withdraw')}
                    className={`${pathname===`/${locale}/withdraw` ? 'bg-[#000000]' : 'bg-white'} flex gap-3 items-center border-[2px] md:px-7 px-3 py-2 border-[#f5f5f5] md:rounded-[10px] rounded-[3px]`}>
                    {pathname===`/${locale}/withdraw` ? (
                            <div className="flex md:gap-3 gap-1">
                                <CircleDollarSign className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#ffffff"/>
                                <h2 className="md:flex hidden text-[#ffffff]">{t('withdraw')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex md:gap-3 gap-1">
                                <CircleDollarSign className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#000000"/>
                                <h2 className="md:flex hidden">{t('withdraw')}</h2>
                            </div>
                        )}
                </div>
            </Link>
            <Link href={`/${locale}/operations-history`}>
                <div
                    onClick={() => setTab('operations-history')}
                    className={`${pathname===`/${locale}/operations-history` ? 'bg-[#000000]' : 'bg-white'} flex gap-3 items-center border-[2px] md:px-7 px-3 py-2 border-[#f5f5f5] md:rounded-[10px] rounded-[3px]`}>
                    {pathname===`/${locale}/operations-history` ? (
                            <div className="flex md:gap-3 gap-1">
                                <History className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#ffffff"/>
                                <h2 className="md:flex hidden text-[#ffffff]">{t('transactions')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex md:gap-3 gap-1">
                                <History className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#000000"/>
                                <h2 className="md:flex hidden">{t('transactions')}</h2>
                            </div>
                        )}
                </div>
            </Link>
            <Link href={`/${locale}/settings`}>
                <div
                    onClick={() => setTab('settings')}
                    className={`${pathname===`/${locale}/settings` ? 'bg-[#000000]' : 'bg-white'} flex gap-3 items-center border-[2px] md:px-7 px-3 py-2 border-[#f5f5f5] md:rounded-[10px] rounded-[3px]`}>
                    {pathname===`/${locale}/settings` ? (
                            <div className="flex md:gap-3 gap-1">
                                <Settings className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#ffffff"/>
                                <h2 className="md:flex hidden text-[#ffffff]">{t('settings')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex md:gap-3 gap-1">
                                <Settings className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#000000"/>
                                <h2 className="md:flex hidden">{t('settings')}</h2>
                            </div>
                        )}

                </div>
            </Link>
            <Link href={`/${locale}/affilate-program`}>
                <div
                    onClick={() => setTab('affilate-program')}
                    className={`${pathname===`/${locale}/affilate-program` ? 'bg-[#000000]' : 'bg-white'} flex gap-3 items-center border-[2px] md:px-7 px-3 py-2 border-[#f5f5f5] md:rounded-[10px] rounded-[3px]`}>
                    {pathname===`/${locale}/affilate-program`  ? (
                            <div className="flexmd:gap-3 gap-1">
                                <FileUser className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#ffffff"/>
                                <h2 className="md:flex hidden text-[#ffffff]">{t('affiliate')}</h2>
                            </div>
                        ) :
                        (
                            <div className="flex gmd:gap-3 gap-1">
                                <FileUser className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#000000"/>
                                <h2 className="md:flex hidden">{t('affiliate')}</h2>
                            </div>
                        )}

                </div>
            </Link>
            <Link href={`https://t.me/technical_support_alliance`}>
                <div
                    className="flex gap-3 cursor-pointer items-center bg-white border-[2px] md:px-7 px-3 py-2 border-[#f5f5f5] md:rounded-[10px] rounded-[3px]">
                    <MessageSquareMore className="lg:w-[30px] mdbvp:w-[25px] md:w-[20px] w-[18px]" color="#1D4ED8"/>
                    <h2 className="md:flex text-blue-500 hidden">{t('exit')}</h2>
                </div>
            </Link>
        </div>
    )
}