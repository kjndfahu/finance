import localFont from "next/font/local";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, unstable_setRequestLocale} from "next-intl/server";
import {Headerlk} from "../../../../components/headerlk/headerlk";
import '../globals.css';
import {NavbarAdmin} from "../../../../components/adminpanel/navbar-admin";

const myFont = localFont({
    src: [
        {
            path: "../(ui)/fonts/SFPRODISPLAYREGULAR.woff",
            weight: '400',
            style: 'normal',
        },
        {
            path: "../(ui)/fonts/SFPRODISPLAYMEDIUM.woff",
            weight: '500',
            style: 'italic',
        },
        {
            path: "../(ui)/fonts/SFPRODISPLAYBOLD.woff",
            weight: '700',
            style: 'normal',
        },
    ],
});
export default async function AdminLayout({
                                                        children,
                                                        params: {locale}
                                                    }: {
    children: React.ReactNode;
    params: {locale: string};
}) {
    const messages = await getMessages();
    unstable_setRequestLocale(locale);
    return (
        <html lang={locale}>
        <body className={myFont.className}>
        <NextIntlClientProvider messages={messages}>
            <Headerlk locale={locale}/>
            <NavbarAdmin locale={locale}/>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    )
}