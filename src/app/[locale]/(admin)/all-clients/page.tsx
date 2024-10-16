import { AllClients } from "../../../../../components/adminpanel/allclients";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../../../utils/authOptions";
import { routing } from "../../../../i18n/routing";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function AllClientsPage({ params }) {
    // Устанавливаем локаль
    unstable_setRequestLocale(params.locale);

    const session = await getServerSession(authOptions);
    const userSession = session?.user?.role;

    if (userSession === 'ADMIN') {
        const messages = await getMessages(); // Получаем сообщения, если это нужно
        return (
            <div className="flex flex-col min-h-screen bg-[#f5f5f5] w-full gap-5 md:px-[150px]">
                <AllClients />
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу
    }
}
