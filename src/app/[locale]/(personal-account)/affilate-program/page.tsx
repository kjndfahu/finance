import {ReferralProgram} from "../../../../../components/lk/refferal-program";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";

export default async function AffilateProgramPage() {
    const session = await getServerSession(authOptions)
    return (
        <div className="flex flex-col min-h-screen bg-[#f5f5f5] w-full gap-5 ">
            <ReferralProgram session={session}/>
        </div>
    )
}