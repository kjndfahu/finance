import {Settings} from "../../../../../components/lk/settings";
import {ChangingPasswordSettings} from "../../../../../components/lk/changing-password-settings";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";

export default async function SettingsPage() {
    const session = await getServerSession(authOptions)
    return (
        <div className="flex flex-col bg-[#f5f5f5] w-full gap-5 ">
            <Settings session={session}/>
            <ChangingPasswordSettings session={session}/>
        </div>
    )
}