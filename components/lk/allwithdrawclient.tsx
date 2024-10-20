'use client'
import {DepositTopUp} from "./deposit-topup";
import {useState} from "react";
import {WithdrawSystem} from "./withdraw-system";
import {WithdrawAddressBlock} from "./withdraw-address-block";
import {WithdrawAmountBalance} from "./withdraw-amount-balance";

interface Props{
    className?:string;
    session:any;
}

export const AllWithdrawClient:React.FC<Props> = ({session})=>{
    const [isSystem, setSystem] = useState('TRC-20')
    const [value, setValue] = useState('');
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5 ">
            <DepositTopUp session={session}/>
            <WithdrawSystem isSystem={isSystem} setSystem={setSystem}/>
            <WithdrawAddressBlock value={value} setValue={setValue}/>
            <WithdrawAmountBalance session={session} value={value} isSystem={isSystem}/>
        </div>
    )
}