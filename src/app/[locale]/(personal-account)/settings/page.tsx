import { Settings } from "../../../../../components/lk/settings";
import { ChangingPasswordSettings } from "../../../../../components/lk/changing-password-settings";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../../../utils/authOptions";
import { routing } from "../../../../i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function SettingsPage({ params }) {
    unstable_setRequestLocale(params.locale);

    const session = await getServerSession(authOptions);
    const userSession = session?.user?.role;

    if (userSession === 'USER') {
        return (
            <div className="flex flex-col bg-[#f5f5f5] w-full gap-5 ">
                <Settings session={session} />
                <ChangingPasswordSettings session={session} />
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу
        return null; // Возвращаем null, чтобы избежать дальнейшего рендеринга
    }
}
