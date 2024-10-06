import {DepositTopUp} from "../../../../../components/lk/deposit-topup";
import {TopUpSystem} from "../../../../../components/lk/top-up-system";
import {TransactionsAdresses} from "../../../../../components/lk/transactions-addresses";

export default function TopUpPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5 ">
            <DepositTopUp/>
            <TopUpSystem/>
            <TransactionsAdresses/>
        </div>
    )
}