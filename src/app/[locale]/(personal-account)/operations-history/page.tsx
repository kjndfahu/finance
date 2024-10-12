'use client'
import {AmountOfPayments} from "../../../../../components/lk/amount-of-payments";
import {PaymentHistory} from "../../../../../components/lk/payment-history";
import {useState} from "react";
import {TopUpHistory} from "../../../../../components/lk/topuphistory";
import {WithdrawHistory} from "../../../../../components/lk/withdrawhostory";

export default function OperationsHistoryPage() {
    const [activeTab, setTab] = useState(1)
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5 ">
            <AmountOfPayments activeTab={activeTab} setTab={setTab}/>
            {activeTab===1 && (
                <PaymentHistory/>
            )}
            {activeTab===2 && (
                <TopUpHistory/>
            )}
            {activeTab===3 && (
                <WithdrawHistory/>
            )}
        </div>
    );
}