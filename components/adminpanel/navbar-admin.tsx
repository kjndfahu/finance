'use client'
import {CircleDollarSign, ClipboardPlus, Settings, ShoppingCart, UserRound} from "lucide-react";
import Link from "next/link";
import {useState} from "react";

interface Props{
    className?:string;
    locale:string;
}

export const NavbarAdmin:React.FC<Props> = ({locale, className})=>{
    const [tab, setTab] = useState('all-clients')
    return (
        <div className="flex flex-col gap-2 text-black text-[17px] bg-[#f5f5f5] px-[150px] pt-[25px] border-[1px] border-[#f5f5f5]">
            <div className="flex w-full justify-between flex-row bg-white gap-2 rounded-[7px] p-4">
                <Link href={`/${locale}/all-clients`}>
                    <div
                        onClick={() => setTab('all-clients')}
                        className="flex gap-2 items-center bg-white border-[2px] px-3 py-3 border-[#f5f5f5] rounded-[10px]">
                        <UserRound width={15} height={15} color="#000000"/>
                        <h2>Все клиенты</h2>
                    </div>
                </Link>
                <Link href={`/${locale}/deposits-list`}>
                    <div
                        onClick={() => setTab('deposit-list')}
                        className="flex gap-2 items-center bg-white border-[2px] px-3 py-3 border-[#f5f5f5] rounded-[10px]">
                    <ShoppingCart color="#000000"/>
                        <h2>Список депозитов</h2>
                    </div>
                </Link>
                <Link href={`/${locale}/topup-requests`}>
                    <div
                        onClick={() => setTab('topup-requests')}
                        className="flex gap-2 items-center bg-white border-[2px] px-3 py-3 border-[#f5f5f5] rounded-[10px]">
                        <ClipboardPlus color="#000000"/>
                        <h2>Заявки на пополнение</h2>
                    </div>
                </Link>
                <Link href={`/${locale}/withdraw-requests`}>
                    <div
                        onClick={() => setTab('withdraw-requests')}
                        className="flex  gap-2 items-center bg-white border-[2px] px-3 py-3 border-[#f5f5f5] rounded-[10px]">
                        <CircleDollarSign color="#000000"/>
                        <h2>Заявки на вывод</h2>
                    </div>
                </Link>
                <Link href={`/${locale}/details`}>
                    <div
                        onClick={() => setTab('details')}
                        className="flex gap-2 items-center bg-white border-[2px] px-3 py-3 border-[#f5f5f5] rounded-[10px]">
                        <Settings color="#000000"/>
                        <h2>Реквизиты</h2>
                    </div>
                </Link>
            </div>

            {tab==='all-clients' ? (
                <Link href={`/${locale}/extra-functional`}>
                    <div
                        className="flex bg-blue-600 text-[17px] text-white items-center justify-center py-3 rounded-[10px]">
                        Дополнительный функционал
                    </div>
                </Link>
            ) : ('')}
        </div>
    )
}