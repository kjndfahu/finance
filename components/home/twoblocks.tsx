import {IndexGreyblock} from "./index-greyblock";
import {PlannedGreyblock} from "./planned-greyblock";

interface Props{
    className?:string,
}

export const TwoBlocks:React.FC<Props> = ({className})=>{
    return (
        <div className="flex mt-[24px] mdbvp:flex-row flex-col gap-6 w-full">
            <IndexGreyblock/>
            <PlannedGreyblock/>
        </div>
    )
}