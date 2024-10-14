import {Login} from "../../../../../components/lk/login";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";

export default function LoginPage() {
    const session = getServerSession(authOptions)
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5 ">
                <Login session={session}/>
        </div>
    )
}