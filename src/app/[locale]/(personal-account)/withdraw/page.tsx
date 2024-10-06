import {DepositTopUp} from "../../../../../components/lk/deposit-topup";
import {WithdrawSystem} from "../../../../../components/lk/withdraw-system";
import {WithdrawAddressBlock} from "../../../../../components/lk/withdraw-address-block";
import {WithdrawAmountBalance} from "../../../../../components/lk/withdraw-amount-balance";

export default function WithdrawPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5 ">
            <DepositTopUp/>
            <WithdrawSystem/>
            <WithdrawAddressBlock/>
            <WithdrawAmountBalance/>
        </div>
    )
}