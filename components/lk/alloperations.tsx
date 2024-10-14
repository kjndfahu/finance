'use client'
import {AmountOfPayments} from "./amount-of-payments";
import {PaymentHistory} from "./payment-history";
import {TopUpHistory} from "./topuphistory";
import {WithdrawHistory} from "./withdrawhostory";
import {useState} from "react";

interface Props{
    className?:string;
    session:any
}
export const AllOperations:React.FC<Props> = ({session, className})=>{
    const [activeTab, setTab] = useState(1)
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full md:gap-5 gap-2">
            <AmountOfPayments activeTab={activeTab} setTab={setTab}/>
            {activeTab===1 && (
                <PaymentHistory session={session}/>
            )}
            {activeTab===2 && (
                <TopUpHistory session={session}/>
            )}
            {activeTab===3 && (
                <WithdrawHistory session={session}/>
            )}
        </div>
    )
}