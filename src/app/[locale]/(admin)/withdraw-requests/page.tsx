import { WithdrawTable } from "../../../../../components/adminpanel/withdraw-table";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../../../../utils/authOptions";
import { routing } from "../../../../i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function WithdrawRequests({ params }) {
    // Устанавливаем локаль перед получением сессии
    unstable_setRequestLocale(params.locale);

    // Получаем сессию
    const session = await getServerSession(authOptions);

    // Проверяем наличие сессии
    if (!session) {
        redirect('/'); // Редирект на главную страницу, если сессия отсутствует
        return null; // Завершаем выполнение функции
    }

    const userSession = session.user?.role; // Извлекаем роль пользователя

    // Проверяем, является ли пользователь администратором
    if (userSession === 'ADMIN') {
        return (
            <div className="flex flex-col min-h-screen bg-[#f5f5f5] w-full gap-5 md:px-[150px]">
                <WithdrawTable />
            </div>
        );
    } else {
        redirect('/'); // Редирект на главную страницу для других ролей
        return null; // Завершаем выполнение функции
    }
}
