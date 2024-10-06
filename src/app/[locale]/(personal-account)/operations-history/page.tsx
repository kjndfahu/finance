import {AmountOfPayments} from "../../../../../components/lk/amount-of-payments";
import {PaymentHistory} from "../../../../../components/lk/payment-history";

export default function OperationsHistoryPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5 ">
            <AmountOfPayments/>
            <PaymentHistory/>
        </div>
    );
}