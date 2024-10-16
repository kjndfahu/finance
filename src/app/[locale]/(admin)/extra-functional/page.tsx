import {ExtraFunctions} from "../../../../../components/adminpanel/extra-functions";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "../../../../../utils/authOptions";
import {routing} from "../../../../i18n/routing";
import {unstable_setRequestLocale} from "next-intl/server";
export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function ExtraFunctionalPage({params}) {
    unstable_setRequestLocale(params.locale);
    const session = await getServerSession(authOptions)
    const userSession = session?.user?.role
    if (userSession === 'ADMIN') {
        return (
            <div className="flex flex-col min-h-screen bg-[#f5f5f5] w-full gap-5 md:px-[150px]">
                <ExtraFunctions/>
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу
    }
}