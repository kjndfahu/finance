import {Login} from "../../../../../components/lk/login";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../../utils/authOptions";
import {routing} from "../../../../i18n/routing";
import {unstable_setRequestLocale} from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}


export default function LoginPage({params}) {
    const session = getServerSession(authOptions)
    unstable_setRequestLocale(params.locale);
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5 ">
                <Login session={session}/>
        </div>
    )
}