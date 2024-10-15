import {AllClients} from "../../../../../components/adminpanel/allclients";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {Account} from "../../../../../components/lk/account";
import {redirect} from "next/navigation";

export default async function AllClientsPage() {
    const session = await getServerSession(authOptions)
    const userSession = session?.user?.role

    if (userSession === 'ADMIN') {
        return (
            <div className="flex flex-col min-h-screen bg-[#f5f5f5] w-full gap-5 md:px-[150px]">
                <AllClients/>
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу
    }
}