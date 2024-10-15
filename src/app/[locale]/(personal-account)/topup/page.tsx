import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {AllTopUp} from "../../../../../components/lk/alltopup";
import {redirect} from "next/navigation";

export default async function TopUpPage() {
    const session = await getServerSession(authOptions)
    const userSession = session?.user?.role
    if (userSession === 'USER') {
        return (
            <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5 ">
                <AllTopUp session={session}/>
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу
    }
}