import Link from "next/link";

interface Props {
    className?: string;
}

export const BurgerMenu: React.FC<Props> = ({className}) => {
    return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-screen z-[49] mt-[48px] bg-white">
            <div className="flex flex-col text-[22px] text-black gap-5">
                <h2>About Us</h2>
                <h2>Investment plans</h2>
                <h2>Portfolio</h2>
                <h2>Contents</h2>
                <h2>Invite and earn</h2>
            </div>
            <div className="flex w-full flex-col px-[20px] gap-3 items-center justify-between">
                <div
                    className="flex w-full items-center bg-[#e5f9ff] rounded-[10px] py-1 font-semibold justify-center text-[15px] text-[#15B0DB]">Sign
                    Up
                </div>
                <div
                    className="flex w-full items-center bg-[#15B0DB] cursor-pointer rounded-[10px] py-1  font-semibold justify-center text-[15px] text-white">Log
                    in
                </div>
            </div>
        </div>
    )
}