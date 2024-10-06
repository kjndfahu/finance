import {HeaderRight} from "./header-right";
import {HeaderLinks} from "./header-links";

interface Props{
    className?:string;
    locale: string;
}

export const Header:React.FC<Props> = ({locale, className}) => {
    return (
        <div className="flex fixed w-full z-50 flex-row bg-white items-center justify-between py-3 px-[75px] shadow-xl">
            <HeaderLinks locale={locale}/>
            <HeaderRight locale={locale}/>
        </div>
    )
}