'use client'
import {HeaderRight} from "./header-right";
import {HeaderLinks} from "./header-links";
import { Tally3 } from "lucide-react";



interface Props{
    className?:string;
    locale: string;
}

export const Header:React.FC<Props> = ({locale, className}) => {
    return (
            <div
                className="flex fixed w-full z-50 flex-row bg-white items-center justify-between py-3 xl:px-[75px] px-[25px] shadow-xl">
                <HeaderLinks locale={locale}/>
                <HeaderRight locale={locale}/>
                <div className="mdbvp:hidden flex font-semibold w-[33%] flex items-center justify-center text-black">RAISON</div>
                <div className="mdbvp:hidden w-[33%] flex items-center justify-end">
                    <Tally3 className="rotate-90" color="#000000"/>
                </div>
            </div>
    )
}