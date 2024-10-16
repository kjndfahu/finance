'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";

interface Props {
    className?: string;
    session:any;
}

export const BurgerMenu: React.FC<Props> = ({session, className}) => {
    const pathname = usePathname();
    const locale = pathname.slice(0, 3);
    const bb = typeof session
    const bg = typeof null
    console.log(typeof session)
    return (
        <div className="flex flex-col w-full items-center min-h-screen gap-10 z-[49] pt-[120px] bg-white">
            <div className="flex flex-col text-[22px] text-black gap-5">
                <Link className="w-full" href={`${locale}/aboutus`}>
                    <h2>About Us</h2>
                </Link>
                <Link className="w-full" href={`${locale}/investment-plans`}>
                    <h2>Investment plans</h2>
                </Link>
                <Link className="w-full" href={`${locale}/portfolio`}>
                    <h2>Portfolio</h2>
                </Link>
                <Link className="w-full" href={`${locale}/content`}>
                    <h2>Contents</h2>
                </Link>
                <Link className="w-full" href={`${locale}/invite-and-earn`}>
                    <h2>Invite and earn</h2>
                </Link>

            </div>
            {session===null && (
                <div className="flex w-[100vw] flex-col px-[20px] gap-3 items-center justify-between">
                    <Link className="w-full" href={`${locale}/registration`}>
                        <div
                            className="flex w-full items-center bg-[#e5f9ff] rounded-[10px] py-1 font-semibold justify-center text-[15px] text-[#15B0DB]">Sign
                            Up
                        </div>
                    </Link>
                    <Link className="w-full" href={`${locale}/login`}>
                        <div
                            className="flex w-full items-center bg-[#15B0DB] cursor-pointer rounded-[10px] py-1  font-semibold justify-center text-[15px] text-white">Log
                            in
                        </div>
                    </Link>
                </div>
            )}
            {bb===bg && (
                <Link className="w-full" href={`${locale}/account`}>
                    <div
                        className="flex items-center bg-[#15B0DB] cursor-pointer rounded-[10px] py-1 font-semibold justify-center text-[15px] text-white">Enter
                    </div>
                </Link>
            )}


        </div>
    )
}