import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {AllOperations} from "../../../../../components/lk/alloperations";

export default async function OperationsHistoryPage() {
    const session = await getServerSession(authOptions)
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full md:gap-5 gap-2">
            <AllOperations session={session}/>
        </div>
    );
}