import {DepositsTable} from "../../../../../components/adminpanel/deposits-table";

export default function DepositsList() {
    return (
        <div className="flex flex-col min-h-screen bg-[#f5f5f5] w-full gap-5 px-[150px]">
            <DepositsTable/>
        </div>
    )
}