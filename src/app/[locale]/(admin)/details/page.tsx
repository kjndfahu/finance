import {Details} from "../../../../../components/adminpanel/details";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function DetailsPage() {
    const session = await getServerSession(authOptions)
    const userSession = session?.user?.role
    if (userSession === 'ADMIN') {
        return (
            <div className="flex flex-col min-h-screen bg-[#f5f5f5] w-full gap-5 md:px-[150px]">
                <Details/>
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу
    }
}