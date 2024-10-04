import {IndexGreyblock} from "@/components/index-greyblock";
import {PlannedGreyblock} from "@/components/planned-greyblock";

interface Props{
    className?:string,
}

export const TwoBlocks:React.FC<Props> = ({className})=>{
    return (
        <div className="flex mt-[24px] flex-row gap-6 w-full">
            <IndexGreyblock/>
            <PlannedGreyblock/>
        </div>
    )
}