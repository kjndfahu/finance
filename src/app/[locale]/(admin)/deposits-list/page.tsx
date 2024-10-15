import {DepositsTable} from "../../../../../components/adminpanel/deposits-table";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {AllClients} from "../../../../../components/adminpanel/allclients";
import {redirect} from "next/navigation";

export default async function DepositsList() {
    const session = await getServerSession(authOptions)
    const userSession = session?.user?.role

    if (userSession === 'ADMIN') {
        return (
            <div className="flex flex-col min-h-screen bg-[#f5f5f5] w-full gap-5 md:px-[150px]">
                <DepositsTable/>
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу
    }
}