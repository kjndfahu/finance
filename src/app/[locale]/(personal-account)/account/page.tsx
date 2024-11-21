import { Account } from "../../../../../components/lk/account";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../../../utils/authOptions";
import { routing } from "../../../../i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function AccountPage({ params }) {
    unstable_setRequestLocale(params.locale);

    const session = await getServerSession(authOptions);
    const userSession = session?.user?.role;

    if (userSession === 'USER') {
        return (
            <div className="flex flex-row bg-[#FFFFFF] min-h-screen w-full gap-5 ">
                <Account session={session} />
            </div>
        );
    } else if (userSession === 'ADMIN') {
        redirect('/en/all-clients');
        return null;
    } else {
        redirect('/');
        return null;
    }
}
