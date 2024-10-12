
import Link from "next/link";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
    locale: string;
}

export const HeaderLinks:React.FC<Props> = ({locale, className}) => {
    const t = useTranslations("HeaderLinks")
    return (
        <div className="mdbvp:flex hidden flex-row items-center xl:gap-8 gap-5">
            <Link href="/">
                <div className="bg-[#b0b0b0] xl:w-[130px] xl:h-[50px] w-[90px] h-[40px] rounded-[10px]"></div>
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