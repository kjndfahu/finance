import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {AllDeposit} from "../../../../../components/lk/alldeposit";

export default async function CreateDepositPage() {
    const session = await getServerSession(authOptions)
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full md:gap-5 gap-2">
            <AllDeposit session={session}/>
        </div>
    )
}