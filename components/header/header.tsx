'use client'
import {HeaderRight} from "./header-right";
import {HeaderLinks} from "./header-links";
import {Tally3, X} from "lucide-react";
import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface Props{
    className?:string;
    session:any;
    locale: string;
}

export const Header:React.FC<Props> = ({session ,locale, className}) => {
    const [isBurger, setBurger] = useState(false)
    const pathname = usePathname()
    console.log(pathname)
    return (
            <div
                className="flex flex-col">
                <div className="flex fixed w-full z-50 flex-row bg-white items-center justify-between py-3 xl:px-[75px] px-[25px] shadow-xl">
                    <HeaderLinks locale={locale}/>
                    <HeaderRight session={session} locale={locale}/>
                    <Link href="/">
                        <div className="mdbvp:hidden w-full flex font-semibold w-[33%] items-center justify-center text-black">
                            ALLIANCE
                        </div>
                    </Link>
                    <div onClick={() => setBurger(!isBurger)}
                         className="mdbvp:hidden w-[33%] flex items-center justify-end">
                        {isBurger &&pathname==='/en/menu' ? (
                            <Link href={`/${locale}`}>
                                <X  color="#000000"/>
                            </Link>
                        ) : (
                            <Link href={`/${locale}/menu`}>
                                <Tally3 className="rotate-90" color="#000000"/>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
    )
}