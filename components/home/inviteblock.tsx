import Image from "next/image";
import phone from "@/assets/investmentTracker.webp";
import {ArrowRight} from "lucide-react";

interface Props{
    className?:string;
}

export const InviteBlock:React.FC<Props> =({className}) => {
    return (
        <div
            className="flex mt-[25px] items-center flex-row rounded-[20px] justify-center gap-[120px] bg-[radial-gradient(414.19%_201.84%_at_0_131.37%,#76a6fc_0,#aef8d0_69.46%)]">
            <div className="flex flex-col gap-5">
                <h2 className="font-semibold text-black text-[50px]  leading-[43px]">Earn money by inviting<br/>
                    real investors</h2>
                <p className="text-[20px] text-black font-thin">The company has three levels of affiliate
                    system<br/> for higher income of existing partners.</p>
                <div
                    className="flex items-center bg-[#F5F5F5] text-black text-[18px] rounded-[10px] py-2 w-[205px] gap-2 font-semibold justify-center">
                    Invite and earn
                    <ArrowRight/>
                </div>
            </div>
            <Image className="pt-[120px]" src={phone} alt="phone"/>
        </div>
    )
}