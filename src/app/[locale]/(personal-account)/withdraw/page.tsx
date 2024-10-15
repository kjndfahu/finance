import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {AllWithdrawClient} from "../../../../../components/lk/allwithdrawclient";
import {redirect} from "next/navigation";

export default async function WithdrawPage() {
    const session = await getServerSession(authOptions)
    const userSession = session?.user?.role
    if (userSession === 'USER') {
        return (
            <AllWithdrawClient session={session}/>
        );
    } else {
        redirect('/'); // Редирект на главную страницу
    }
}