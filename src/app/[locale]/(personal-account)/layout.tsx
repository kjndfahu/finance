import localFont from "next/font/local";
import {NextIntlClientProvider} from "next-intl";
import {getMessages, unstable_setRequestLocale} from "next-intl/server";
import {Headerlk} from "../../../../components/headerlk/headerlk";
import '../globals.css';
import {LkNavbar} from "../../../../components/lk/lk-navbar";
import {Toaster} from "react-hot-toast";


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
export default async function PersonalAccountLayout({
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
            <NextIntlClientProvider locale={locale} messages={messages}>
                <Toaster/>
                <Headerlk locale={locale}/>
                <div className="flex md:flex-row flex-col lg:px-[120px] md:px-[30px] pt-[25px] w-full lg:gap-10 md:gap-5 gap-1 bg-[#f5f5f5]">
                    <LkNavbar locale={locale}/>
                    {children}
                </div>
            </NextIntlClientProvider>
            </body>
            </html>
    )
}