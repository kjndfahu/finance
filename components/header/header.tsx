'use client'
import {HeaderRight} from "./header-right";
import {HeaderLinks} from "./header-links";
import {Tally3, X} from "lucide-react";
import {useState} from "react";
import {BurgerMenu} from "../burgermenu";

interface Props{
    className?:string;
    session:any;
    locale: string;
}

export const Header:React.FC<Props> = ({session ,locale, className}) => {
    const [isBurger, setBurger] = useState(false)
    return (
            <div
                className="flex flex-col">
                <div className="flex fixed w-full z-50 flex-row bg-white items-center justify-between py-3 xl:px-[75px] px-[25px] shadow-xl">
                    <HeaderLinks locale={locale}/>
                    <HeaderRight session={session} locale={locale}/>
                    <div className="mdbvp:hidden flex font-semibold w-[33%] flex items-center justify-center text-black">RAISON</div>
                    <div onClick={() => setBurger(!isBurger)} className="mdbvp:hidden w-[33%] flex items-center justify-end">
                        {isBurger ? (
                            <X  color="#000000"/>
                        ) : (
                            <Tally3 className="rotate-90" color="#000000"/>
                        )}
                    </div>
                </div>
                {isBurger && <BurgerMenu/> }
            </div>
    )
}