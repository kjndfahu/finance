import { getServerSession } from "next-auth";
import { AllDeposit } from "../../../../../components/lk/alldeposit";
import { redirect } from "next/navigation";
import { authOptions } from "../../../../../utils/authOptions";
import { routing } from "../../../../i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function CreateDepositPage({ params }) {
    unstable_setRequestLocale(params.locale);

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
        return null;
    }

    const userSession = session.user?.role;

    if (userSession === 'USER') {
        return (
            <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full md:gap-5 gap-2">
                <AllDeposit session={session} />
            </div>
        );
    } else {
        redirect('/');
        return null;
    }
}
