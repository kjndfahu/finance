import {Account} from "../../../../../components/lk/account";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";

export default async function AccountPage() {
    const session = await getServerSession(authOptions)
    return (
        <div className="flex flex-row bg-[#FFFFFF] min-h-screen w-full gap-5 ">
            <Account session={session} />
        </div>
    );
}