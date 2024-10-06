'use client'

import {usePathname, useRouter} from "next/navigation";
import {useState} from "react";

interface Props{
    className?:string;
    locale: string;
}

export const LangModal:React.FC<Props> = ({locale, className}) => {
    const router = useRouter();
    const pathname = usePathname()
    const changeLanguage = (locale: string) => {
        const pathWithoutLocale = pathname.split('/').slice(2).join('/');
        const newPathname = `/${locale}/${pathWithoutLocale}`;
        router.push(newPathname);
    };
    return (
        <div className="flex flex-col absolute w-[12%] text-black z-[25] mt-[165px] border-[1px] border-[#f5f5f5] px-1 py-2 bg-white shadow-xl rounded-[10px]">
            <div onClick={() => changeLanguage('en')} className="flex items-center mx-2 p-2 rounded-[10px] gap-3 hover:bg-[#f5f5f5]">
                <img className="w-[25px] h-[25px]" src="https://cdn.weglot.com/flags/circle/gb.svg" alt="/"/>
                <h2 className="text-black">English</h2>
            </div>
            <div onClick={() => changeLanguage('ru')} className="flex items-center mx-2 p-2 rounded-[10px] gap-3 hover:bg-[#f5f5f5]">
                <img className="w-[25px] h-[25px]" src="https://cdn.weglot.com/flags/circle/ru.svg" alt="/"/>
                <h2 className="text-black">Russian</h2>
            </div>
        </div>
    )
}