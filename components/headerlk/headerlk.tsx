'use client';

import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { LangModal } from "../lang-modal";
import { useState } from "react";
import { Logo } from "../icons";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {signOut} from "next-auth/react";
import {router} from "next/client";

interface Props {
    className?: string;
    locale: string;
}

export const Headerlk: React.FC<Props> = ({ locale }) => {
    const pathname = usePathname();
    const isAuthPage = pathname === `/${locale}/registration` || pathname === `/${locale}/login`;
    const [isClicked, setClicked] = useState(false);
    const [isLang, setLang] = useState(false);
    const t = useTranslations('NavbarLK');





    return (
        <div className="flex flex-row items-center bg-[#f5f5f5] text-black mdbvp:text-[23px] text-[17px] justify-between w-full lg:px-[150px] px-[10px] pt-[25px]">
            <Link href="/">
                <Logo className="md:w-[200px] md:h-[100px] w-[120px] h-[80px]" />
            </Link>
            <div className="flex flex-row mdbvp:gap-5 gap-2">
                <div onClick={() => {
                    setClicked(!isClicked);
                    setLang(!isLang);
                }} className="flex flex-row items-center gap-2 cursor-pointer">
                    {locale === 'en' ? (
                        <>
                            <img className="mdbvp:w-[25px] mdbvp:h-[25px] w-[18px] h-[18px]" src="https://cdn.weglot.com/flags/circle/gb.svg" alt="/" />
                            <div className="flex items-center flex-row gap-1">
                                <h2 className="md:flex hidden text-black">English</h2>
                                <ChevronDown
                                    className={`transform transition-transform duration-300 ${isClicked ? `rotate-180` : ''}`}
                                    width={15} color="#000000" />
                            </div>
                        </>
                    ) : (
                        <>
                            <img className="w-[25px] h-[25px]" src="https://cdn.weglot.com/flags/circle/ru.svg" alt="/" />
                            <div className="flex items-center flex-row gap-1">
                                <h2 className="md:flex hidden text-black">Russian</h2>
                                <ChevronDown
                                    className={`transform transition-transform duration-300 ${isClicked ? `rotate-180` : ''}`}
                                    width={15} color="#000000" />
                            </div>
                        </>
                    )}
                    {isLang ? (
                        <LangModal locale={locale} />
                    ) : ('')}
                </div>
                {isAuthPage ? (
                    <>
                        <Link href={`/${locale}/registration`}>
                            <div className="flex flex-row gap-3">
                                <div
                                    className="bg-blue-600 mdbvp:text-[17px] text-[14px] mdbvp:px-5 px-3 mdbvp:py-2 py-1 mdbvp:rounded-[10px] rounded-[5px] cursor-pointer text-white">{t('registration')}
                                </div>
                            </div>
                        </Link>

                        <Link href={`/${locale}/login`}>
                            <div className="flex flex-row gap-3">
                                <div className="mdbvp:text-[17px] text-[14px] mdbvp:px-5 px-3 mdbvp:py-2 py-1 mdbvp:rounded-[10px] rounded-[5px] cursor-pointer text-black">{t('login')}
                                </div>
                            </div>
                        </Link>
                    </>
                ) : (
                    <Link href="#" onClick={() => signOut({redirect: true})}>
                        <button className="text-black cursor-pointer">
                            <h4>{t('exit-btn')}</h4>
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}
