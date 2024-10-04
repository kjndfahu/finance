import {ArrowRight, ChevronRight} from "lucide-react";

interface Props{
    className?:string
}

export const IndexGreyblock:React.FC<Props> = ({className})=>{
    return (
        <div className="flex bg-[#F5F5F5] rounded-[50px] py-[100px] w-full items-center justify-center">
            <div className="flex flex-col gap-5">
                <h2 className="text-black text-[42px] leading-[45px] font-semibold">Invest in<br/> <span className="text-[#07B1B6]">ready-made<br/> indexes</span>.</h2>
                <p className="text-[20px] text-black font-thin">Invest in intelligently designed indices and<br/> make money in any market conditions</p>
                <div className="flex items-center text-black text-[18px] rounded-[10px] py-2 w-[175px] gap-2 font-semibold justify-center border-[1px] border-black">
                    Learn more
                    <ArrowRight/>
                </div>
            </div>
        </div>
    )
}