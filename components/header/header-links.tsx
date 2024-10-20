
import Link from "next/link";
import {useTranslations} from "next-intl";
import {Logo} from "../icons";

interface Props{
    className?:string;
    locale: string;
}

export const HeaderLinks:React.FC<Props> = ({locale, className}) => {
    const t = useTranslations("HeaderLinks")
    return (
        <div className="mdbvp:flex hidden flex-row items-center xl:gap-8 gap-5">
            <Link href="/">
                <Logo className="md:w-[160px] md:h-[80px] w-[120px] h-[80px]"/>
            </Link>
            <Link href={`/${locale}/aboutus`}>
                <div className="flex gap-2 items-center xl:text-[19px] lg:text-[17px] text-[15px] text-black">
                    {t('aboutus')}
                </div>
            </Link>
            <Link href={`/${locale}/investment-plans`}>
                <div className="flex gap-2 items-center xl:text-[19px] lg:text-[17px] text-[15px] text-black">
                    {t("investment-plans")}
                </div>
            </Link>
            <Link href={`/${locale}/portfolio`}>
                <div className="flex gap-2 items-center xl:text-[19px] lg:text-[17px] text-[15px] text-black">
                    {t("portfolio")}
                </div>
            </Link>
            <Link href={`/${locale}/content`}>
                <div className="flex gap-2 items-center xl:text-[19px] lg:text-[17px] text-[15px] text-black">
                    {t("contents")}
                </div>
            </Link>
        </div>
    )
}