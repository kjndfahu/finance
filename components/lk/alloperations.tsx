'use client'
import {AmountOfPayments} from "./amount-of-payments";
import {PaymentHistory} from "./payment-history";
import {TopUpHistory} from "./topuphistory";
import {WithdrawHistory} from "./withdrawhostory";
import {useState} from "react";

interface Props {
    className?: string;
    session: any;
}

export const AllOperations: React.FC<Props> = ({session, className}) => {
    const [activeTab, setTab] = useState(1);
    const [minSum, setMinSum] = useState<number | null>(null);
    const [maxSum, setMaxSum] = useState<number | null>(null);
    const [totalTopupSum, setTotalTopupSum] = useState<number>(0);
    const [totalWithdrawSum, setTotalWithdrawSum] = useState<number>(0);
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full md:gap-5 gap-2">
            <AmountOfPayments
                activeTab={activeTab}
                setTab={setTab}
                setMinSum={setMinSum}
                setMaxSum={setMaxSum}
                totalTopupSum={totalTopupSum}
                totalWithdrawSum={totalWithdrawSum}
            />
            {activeTab === 1 && (
                <PaymentHistory
                    session={session}
                    minSum={minSum}
                    maxSum={maxSum}
                    setTotalTopupSum={setTotalTopupSum}
                    setTotalWithdrawSum={setTotalWithdrawSum}
                />
            )}
            {activeTab === 2 && (
                <TopUpHistory session={session}
                              minSum={minSum}
                              maxSum={maxSum}
                              setTotalTopupSum={setTotalTopupSum}
                              setTotalWithdrawSum={setTotalWithdrawSum} />
            )}
            {activeTab === 3 && (
                <WithdrawHistory session={session}
                                 minSum={minSum}
                                 maxSum={maxSum}
                                 setTotalTopupSum={setTotalTopupSum}
                                 setTotalWithdrawSum={setTotalWithdrawSum} />
            )}
        </div>
    );
};