'use client'

import {usePathname, useRouter} from "next/navigation";

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
        <div className="flex flex-col absolute md:items-start items-center md:w-[12%] w-[50px] text-black z-[25] lg:mt-[165px] md:mt-[140px] mt-[120px] border-[1px] border-[#f5f5f5] md:px-1 py-2 bg-white shadow-xl rounded-[10px]">
            <div onClick={() => changeLanguage('en')} className="flex items-center mdbvp:mx-2 lg:p-2 py-1 rounded-[10px] mdbvp:gap-3 gap-1 hover:bg-[#f5f5f5]">
                <img className="lg:w-[25px] lg:h-[25px] w-[20px] h-[20px] " src="https://cdn.weglot.com/flags/circle/gb.svg" alt="/"/>
                <h2 className="md:flex hidden lg:text-[18px] text-[14px] text-black">English</h2>
            </div>
            <div onClick={() => changeLanguage('ru')} className="flex items-center mdbvp:mx-2 lg:p-2 py-1 rounded-[10px] mdbvp:gap-3 gap-1 hover:bg-[#f5f5f5]">
                <img className="lg:w-[25px] lg:h-[25px] w-[20px] h-[20px]" src="https://cdn.weglot.com/flags/circle/ru.svg" alt="/"/>
                <h2 className="md:flex hidden lg:text-[18px] text-[14px] text-black">Russian</h2>
            </div>
        </div>
    )
}