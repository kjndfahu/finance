'use client'
import {DepositTopUp} from "./deposit-topup";
import {TopUpAmountBalance} from "./topupamountbalance";
import {TopUpSystem} from "./top-up-system";
import {useState} from "react";

interface Props{
    className?:string;
    session:any;
}

export const AllTopUp:React.FC<Props> = ({session, className})=>{
    const [isSystem, setSystem] = useState('TRC-20')
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full md:gap-5 gap-2">
            <DepositTopUp session={session}/>
            <TopUpSystem isSystem={isSystem} setSystem={setSystem} />
            <TopUpAmountBalance session={session} isSystem={isSystem}/>
        </div>
    )
}