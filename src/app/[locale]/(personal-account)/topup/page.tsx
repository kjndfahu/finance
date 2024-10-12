import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {AllTopUp} from "../../../../../components/lk/alltopup";

export default async function TopUpPage() {
    const session = await getServerSession(authOptions)
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5 ">
            <AllTopUp session={session}/>
        </div>
    )
}