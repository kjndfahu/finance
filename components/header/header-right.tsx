'use client'

import Link from "next/link";
import {useTranslations} from "next-intl";
import {ChevronDown} from "lucide-react";
import {useState} from "react";
import {LangModal} from "../lang-modal";

interface Props{
    className?:string;
    locale: string;
}

export const HeaderRight:React.FC<Props> = ({locale, className}) => {
    const t = useTranslations("HeaderRight")
    const [isModal, setModal] = useState(false)
    const [isClicked, setClicked] = useState(false)
    const [isLang, setLang] = useState(false)
    console.log(locale, '666')
    return (
        <div className="flex flex-row items-center text-[19px] gap-3">
            <div onClick={() => {setClicked(!isClicked);setLang(!isLang)}} className="flex flex-row items-center gap-2 cursor-pointer">
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
            <Link href={`/${locale}/invite-and-earn`}>
                <div
                    className="flex items-center bg-[#e5f9ff] rounded-[10px] py-1 px-3 font-semibold justify-center text-[#15B0DB]">{t("invite-and-earn")}</div>
            </Link>
            <Link href={`/${locale}/registration`}>
                <div
                    onClick={() => setModal(true)}
                    className="flex items-center bg-[#15B0DB] cursor-pointer rounded-[10px] py-1 px-7 font-semibold justify-center text-white">{t("getstarted")}
                </div>
            </Link>
        </div>
    )
}
