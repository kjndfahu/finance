import {HeaderLinks} from "@/app/components/header-links";
import {HeaderRight} from "@/app/components/header-right";

interface Props{
    className?:string;
}

export const Header:React.FC<Props> = ({className}) => {
    return (
        <div className="flex flex-row items-center justify-between py-3 px-[75px]">
            <HeaderLinks/>
            <HeaderRight/>
        </div>
    )
}