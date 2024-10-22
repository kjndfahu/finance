'use client'
import {DepositTopUp} from "./deposit-topup";
import {TopUpAmountBalance} from "./topupamountbalance";
import {TopUpSystem} from "./top-up-system";
import {useState} from "react";
import {TopUpHistoryTable} from "./topuphistorytable";

interface Props{
    className?:string;
    session:any;
}

export const AllTopUp:React.FC<Props> = ({session, className})=>{
    const [isSystem, setSystem] = useState('TRC-20')
    const [balance, setBalance] = useState(session.user.balance);
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full md:gap-5 gap-2">
            <DepositTopUp balance={balance} session={session}/>
            <TopUpSystem isSystem={isSystem} setSystem={setSystem} />
            <TopUpAmountBalance  session={session} isSystem={isSystem}/>
            <TopUpHistoryTable session={session} />
        </div>
    )
}