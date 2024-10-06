'use client'
import {usePathname, useRouter} from "next/navigation";
import {ChevronDown} from "lucide-react";
import {LangModal} from "../lang-modal";
import {useState} from "react";

interface Props {
    className?: string;
    locale: string;
}

export const Headerlk: React.FC<Props> = ({locale}) => {
    console.log(locale)
    const pathname = usePathname()
    const isAuthPage = pathname === `/${locale}/registration` || pathname === `/${locale}/login`;
    const [isClicked, setClicked] = useState(false)
    const [isLang, setLang] = useState(false)
    return (
        <div
            className="flex flex-row items-center bg-[#f5f5f5] text-black text-[23px] justify-between w-full px-[150px] pt-[25px]">
            <div className="flex flex-row gap-5 items-center">
                <div className=" bg-blue-600 w-[55px] h-[55px] rounded-[10px]"></div>
                <h1>Alliance</h1>
            </div>
            <div className="flex flex-row gap-5">
                <div onClick={() => {
                    setClicked(!isClicked);
                    setLang(!isLang)
                }} className="flex flex-row items-center gap-2 cursor-pointer">
                    {locale==='en' ? (
                        <>
                            <img className="w-[25px] h-[25px]" src="https://cdn.weglot.com/flags/circle/gb.svg" alt="/"/>
                            <div className="flex items-center flex-row gap-1">
                                <h2 className="text-black">English</h2>
                                <ChevronDown
                                    className={`transform transition-transform duration-300 ${isClicked ? `rotate-180` : ''}`}
                                    width={15} color="#000000"/>
                            </div>
                        </>
                    ) : (
                        <>
                            <img className="w-[25px] h-[25px]" src="https://cdn.weglot.com/flags/circle/ru.svg" alt="/"/>
                            <div className="flex items-center flex-row gap-1">
                                <h2 className="text-black">Russian</h2>
                                <ChevronDown
                                    className={`transform transition-transform duration-300 ${isClicked ? `rotate-180` : ''}`}
                                    width={15} color="#000000"/>
                            </div>
                        </>
                    )}
                    {isLang ? (
                        <LangModal locale={locale}/>
                    ) : ('')}
                </div>
                {isAuthPage ? (
                    <>
                        <div className="flex flex-row gap-3">
                            <div className="bg-blue-600 text-[17px] px-5 py-2 rounded-[10px] cursor-pointer text-white">Регистрация
                            </div>
                        </div>
                        <div className="flex flex-row gap-3">
                            <div className="text-[17px] px-5 py-2 rounded-[10px] cursor-pointer text-black">Вход
                            </div>
                        </div>
                    </>
                ) : (
                    <h4>Выйти</h4>
                )}
            </div>
        </div>
    )
}