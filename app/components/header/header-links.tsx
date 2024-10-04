import {ChevronDown} from "lucide-react";

interface Props{
    className?:string;
}

export const HeaderLinks:React.FC<Props> = ({className}) => {


    return (
        <div className="flex flex-row items-center gap-10">
            <div className="bg-[#b0b0b0] w-[130px] h-[50px] rounded-[10px]"></div>
            <div className="flex gap-2 items-center text-[19px] text-black">
                Personal
                <ChevronDown width={15} height={15} color="#000000"/>
            </div>
            <div className="flex gap-2 items-center text-[19px] text-black">
                Institutional
                <ChevronDown width={15} height={15} color="#000000"/>
            </div>
            <div className="flex gap-2 items-center text-[19px] text-black">
                Wealth
            </div>
            <div className="flex gap-2 items-center text-[19px] text-black">
                Company
                <ChevronDown width={15} height={15} color="#000000"/>
            </div>
        </div>
    )
}