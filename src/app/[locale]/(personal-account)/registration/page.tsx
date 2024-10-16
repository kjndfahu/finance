import {Registration} from "../../../../../components/lk/registration";
import {routing} from "../../../../i18n/routing";
import {unstable_setRequestLocale} from "next-intl/server";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function RegistrationPage({params}) {
    unstable_setRequestLocale(params.locale);
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full gap-5 ">
            <Registration/>
        </div>
    )
}