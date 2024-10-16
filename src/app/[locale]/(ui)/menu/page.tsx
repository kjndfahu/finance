import {getServerSession} from "next-auth";
import {BurgerMenu} from "../../../../../components/burgermenu";
import {authOptions} from "../../../../../utils/authOptions";
import {routing} from "../../../../i18n/routing";
import {unstable_setRequestLocale} from "next-intl/server";
export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function Menu({params}) {
    unstable_setRequestLocale(params.locale);
    const session = await getServerSession(authOptions)
    console.log(session)
    return (
        <div className="flex w-full">
            <BurgerMenu session={session}/>
        </div>
    );
}