import { ReferralProgram } from "../../../../../components/lk/refferal-program";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../../../utils/authOptions";
import { routing } from "../../../../i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";
import {ReferralsTable} from "../../../../../components/lk/referrals-table";
import {ReferralsInfo} from "../../../../../components/lk/referral-info";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function AffilateProgramPage({ params }) {
    unstable_setRequestLocale(params.locale);

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
        return null;
    }

    const userSession = session.user.role;
    console.log(generateStaticParams)
    if (userSession === 'USER') {
        return (
            <div className="flex flex-col min-h-screen bg-[#f5f5f5] w-full gap-5 ">
                <ReferralProgram session={session} />
                <ReferralsInfo session={session}/>
                <ReferralsTable session={session} />
            </div>
        );
    } else {
        redirect('/');
        return null;
    }
}
