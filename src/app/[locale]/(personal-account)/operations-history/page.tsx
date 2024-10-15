import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {AllOperations} from "../../../../../components/lk/alloperations";
import {Account} from "../../../../../components/lk/account";
import {redirect} from "next/navigation";

export default async function OperationsHistoryPage() {
    const session = await getServerSession(authOptions)
    const userSession = session?.user?.role
    if (userSession === 'USER') {
        return (
            <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full md:gap-5 gap-2">
                <AllOperations session={session}/>
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу
    }
}