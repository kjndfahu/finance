import {Settings} from "../../../../../components/lk/settings";
import {ChangingPasswordSettings} from "../../../../../components/lk/changing-password-settings";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {AllOperations} from "../../../../../components/lk/alloperations";
import {redirect} from "next/navigation";

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    const userSession = session?.user?.role
    if (userSession === 'USER') {
        return (
            <div className="flex flex-col bg-[#f5f5f5] w-full gap-5 ">
                <Settings session={session}/>
                <ChangingPasswordSettings session={session}/>
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу
    }
}