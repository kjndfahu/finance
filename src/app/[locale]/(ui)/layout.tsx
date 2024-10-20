import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import localFont from "next/font/local";
import '../globals.css';
import {Header} from "../../../../components/header/header";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../../utils/authOptions";
const myFont = localFont({
    src: [
        {
            path: "./fonts/SFPRODISPLAYREGULAR.woff",
            weight: '400',
            style: 'normal',
        },
        {
            path: "./fonts/SFPRODISPLAYMEDIUM.woff",
            weight: '500',
            style: 'italic',
        },
        {
            path: "./fonts/SFPRODISPLAYBOLD.woff",
            weight: '700',
            style: 'normal',
        },
    ],
});

export default async function LocaleLayout({
                                               children,
                                               params: {locale}
                                           }: {
    children: React.ReactNode;
    params: {locale: string};
}) {
    const messages = await getMessages();
    unstable_setRequestLocale(locale);
    const session = getServerSession(authOptions)
    return (
        <html lang={locale}>
        <body className={myFont.className}>
            <NextIntlClientProvider messages={messages}>
                <Header session={session} locale={locale}/>
                {children}
            </NextIntlClientProvider>
        </body>
        </html>
    );
}