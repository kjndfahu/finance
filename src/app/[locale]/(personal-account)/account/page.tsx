import {Account} from "../../../../../components/lk/account";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {redirect, usePathname} from "next/navigation";

export default async function AccountPage() {
    const session = await getServerSession(authOptions)
    const userSession = session?.user?.role

    if (userSession === 'USER') {
        return (
            <div className="flex flex-row bg-[#FFFFFF] min-h-screen w-full gap-5 ">
                <Account session={session} />
            </div>
        );
    } else if (userSession === 'ADMIN'){
        redirect('/en/all-clients');
    } else {
        redirect('/');
    }
}