import {ArrowRight} from "lucide-react";

export const PlannedGreyblock:React.FC = () => {
    return (
        <div className="flex bg-[#F5F5F5] rounded-[50px] py-[100px] w-full items-center justify-center">
            <div className="flex flex-col gap-5">
                <h2 className="text-[#036AC8] text-[42px] leading-[45px] font-semibold">All of our<br/> fixed
                    income<br/>
                    plans
                    <span className="text-black"> for<br/> projected profitability</span></h2>
                <p className="text-[20px] text-black font-thin">Plan and predict earnings all<br/>
                    income is fixed</p>
            </div>
        </div>
    )
}