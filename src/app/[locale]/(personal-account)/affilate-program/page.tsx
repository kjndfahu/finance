import {ReferralProgram} from "../../../../../components/lk/refferal-program";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function AffilateProgramPage() {
    const session = await getServerSession(authOptions)
    const userSession = session?.user?.role
    if (userSession === 'USER') {
        return (
            <div className="flex flex-col min-h-screen bg-[#f5f5f5] w-full gap-5 ">
                <ReferralProgram session={session}/>
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу
    }
}