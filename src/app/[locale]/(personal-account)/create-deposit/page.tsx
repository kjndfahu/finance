import {DepositTopUp} from "../../../../../components/lk/deposit-topup";
import {DepositAmountBalance} from "../../../../../components/lk/deposit-amount-balance";
import {DepositTarrifPlan} from "../../../../../components/lk/deposit-tarrif-plan";

export default function CreateDepositPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5">
            <DepositTopUp/>
            <DepositAmountBalance/>
            <DepositTarrifPlan/>
        </div>
    )
}