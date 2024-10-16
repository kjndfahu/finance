import { getServerSession } from "next-auth";
import { AllTopUp } from "../../../../../components/lk/alltopup";
import { redirect } from "next/navigation";
import { authOptions } from "../../../../../utils/authOptions";
import { routing } from "../../../../i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function TopUpPage({ params }) {
    // Устанавливаем локаль перед получением сессии
    unstable_setRequestLocale(params.locale);

    const session = await getServerSession(authOptions);

    // Проверяем наличие сессии
    if (!session) {
        redirect('/'); // Редирект на главную страницу, если сессия отсутствует
        return null; // Завершаем выполнение функции
    }

    const userSession = session.user?.role; // Извлекаем роль пользователя

    if (userSession === 'USER') {
        return (
            <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5 ">
                <AllTopUp session={session} />
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу для других ролей
        return null; // Завершаем выполнение функции
    }
}
