import {getServerSession} from "next-auth";
import {AllWithdrawClient} from "../../../../../components/lk/allwithdrawclient";
import {redirect} from "next/navigation";
import {authOptions} from "../../../../../utils/authOptions";
import {routing} from "../../../../i18n/routing";
import {unstable_setRequestLocale} from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function WithdrawPage({params}) {
    unstable_setRequestLocale(params.locale);
    const session = await getServerSession(authOptions)
    const userSession = session?.user?.role
    if (userSession === 'USER') {
        return (
            <AllWithdrawClient session={session}/>
        );
    } else {
        redirect('/');
    }
}