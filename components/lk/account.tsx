import {Deposit} from "./deposit";
import {Statistics} from "./statistics";

interface Props{
    className?:string;
    session:any
}
export const Account:React.FC<Props> = ({session, className})=>{
    return (
        <div className="flex flex-col gap-5 w-full bg-[#f5f5f5]">
            <Deposit session={session}/>
            <Statistics session={session}/>
        </div>
    )
}
