import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import localFont from "next/font/local";
import '../globals.css';
import {Header} from "../../../../components/header/header";
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
    console.log(locale)
    return (
        <html lang={locale}>
        <body className={myFont.className}>
        <NextIntlClientProvider messages={messages}>
            <Header locale={locale}/>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}