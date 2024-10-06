
import Link from "next/link";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
    locale: string;
}

export const HeaderLinks:React.FC<Props> = ({locale, className}) => {
    const t = useTranslations("HeaderLinks")
    return (
        <div className="flex flex-row items-center gap-8">
            <Link href="/">
                <div className="bg-[#b0b0b0] w-[130px] h-[50px] rounded-[10px]"></div>
            </Link>
            <Link href={`/${locale}/aboutus`}>
                <div className="flex gap-2 items-center text-[19px] text-black">
                    {t('aboutus')}
                </div>
            </Link>
            <Link href={`/${locale}/investment-plans`}>
                <div className="flex gap-2 items-center text-[19px] text-black">
                    {t("investment-plans")}
                </div>
            </Link>
            <Link href={`/${locale}/portfolio`}>
                <div className="flex gap-2 items-center text-[19px] text-black">
                    {t("portfolio")}
                </div>
            </Link>
            <Link href={`/${locale}/content`}>
                <div className="flex gap-2 items-center text-[19px] text-black">
                    {t("contents")}
                </div>
            </Link>
        </div>
    )
}