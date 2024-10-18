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

    // Проверяем наличие сессии перед доступом к user.role
    if (!session) {
        redirect('/'); // Редирект на главную страницу, если сессия отсутствует
        return null; // Завершаем выполнение функции
    }

    const userSession = session.user.role;

    if (userSession === 'USER') {
        return (
            <div className="flex flex-col min-h-screen bg-[#f5f5f5] w-full gap-5 ">
                <ReferralProgram session={session} />
                <ReferralsInfo session={session}/>
                <ReferralsTable session={session} />
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу для других ролей
        return null; // Завершаем выполнение функции
    }
}
