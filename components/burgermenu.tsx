'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useTranslations} from "next-intl";

interface Props {
    className?: string;
    session:any;
}

export const BurgerMenu: React.FC<Props> = ({session, className}) => {
    const pathname = usePathname();
    const locale = pathname.slice(0, 3);
    const bb = typeof session
    const bg = typeof null
    const t = useTranslations('BurgerMenu')
    return (
        <div className="flex flex-col w-full items-center min-h-screen gap-10 z-[49] pt-[120px] bg-white">
            <div className="flex flex-col text-[22px] text-black gap-5">
                <Link className="w-full" href={`${locale}/aboutus`}>
                    <h2>{t('aboutus')}</h2>
                </Link>
                <Link className="w-full" href={`${locale}/investment-plans`}>
                    <h2>{t('investment-plans')}</h2>
                </Link>
                <Link className="w-full" href={`${locale}/portfolio`}>
                    <h2>{t('portfolio')}</h2>
                </Link>
                <Link className="w-full" href={`${locale}/content`}>
                    <h2>{t('contents')}</h2>
                </Link>
                <Link className="w-full" href={`${locale}/invite-and-earn`}>
                    <h2>{t('invite-and-earn')}</h2>
                </Link>

            </div>
            {session===null && (
                <div className="flex w-[100vw] flex-col px-[20px] gap-3 items-center justify-between">
                    <Link className="w-full" href={`${locale}/registration`}>
                        <div
                            className="flex w-full items-center bg-[#e5f9ff] rounded-[10px] py-1 font-semibold justify-center text-[15px] text-[#15B0DB]">{t('getstarted')}
                        </div>
                    </Link>
                    <Link className="w-full" href={`${locale}/login`}>
                        <div
                            className="flex w-full items-center bg-[#15B0DB] cursor-pointer rounded-[10px] py-1  font-semibold justify-center text-[15px] text-white">{t('personal-account')}
                        </div>
                    </Link>
                </div>
            )}
            {session!==null && (
                <Link className="w-full" href={`${locale}/account`}>
                    <div
                        className="flex items-center bg-[#15B0DB] cursor-pointer rounded-[10px] py-1 font-semibold justify-center text-[15px] text-white">{t('personal-account')}
                    </div>
                </Link>
            )}


        </div>
    )
}