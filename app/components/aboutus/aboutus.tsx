import {AboutImage} from "@/app/components/aboutimage";
import {ArrowRight} from "lucide-react";

interface Props{
    className?:string;
}

export const AboutUs:React.FC<Props> = ({className}) => {
    return (
        <div className="flex flex-col gap-16">
            <AboutImage/>
            <div className="flex flex-row justify-between px-[100px] rounded-[20px] py-12 bg-[#F5F5F5] w-full text-black font-semibold text-[32px]">
                <div className="flex flex-col">
                    <h2>30,000+</h2>
                    <p className="text-[18px] text-[#b0b0b0] font-normal">Users from 34 countries</p>
                </div>
                <div className="flex flex-col">
                    <h2>10+ years</h2>
                    <p className="text-[18px] text-[#b0b0b0] font-normal">Investments experience</p>
                </div>
                <div className="flex flex-col">
                    <h2>$700M+</h2>
                    <p className="text-[18px] text-[#b0b0b0] font-normal">Trading turnover</p>
                </div>
                <div className="flex items-center px-14 rounded-[10px] flex-row gap-2 bg-white text-[20px]">
                    More about us
                    <ArrowRight color="#000000"/>
                </div>
            </div>
        </div>
    )
}