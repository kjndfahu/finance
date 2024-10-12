import {SharesTariffs} from "./shares-tariffs";
import {PrivateTarrifs} from "./private-tariffs";
import {IpoTarrifs} from "./ipo-tariffs";
import {useTranslations} from "next-intl";


interface Props{
    className?:string;
}

export const Tarrifs:React.FC<Props> =({className}) => {
    const t = useTranslations('Tarrifs')
    return (
        <div className="flex flex-col items-center md:py-[75px] py-[30px] md:rounded-[50px] rounded-[15px] md:mt-[40px] mt-[20px] justify-center w-full bg-[#F5F5F5]">
            <div className="flex flex-col text-center md:gap-5 gap-2">
                <h2 className="text-[18px] text-[#b0b0b0] leading-[18px] font-semibold">{t('account-plans')}</h2>
                <h1 className="text-black md:text-[48px] text-[28px] md:leading-[48px] leading-[28px] font-semibold">{t('choose-path')}</h1>
            </div>

            <div className="flex mdbvp:flex-row flex-col md:mt-[60px] mt-[20px] gap-5 w-full mdbvp:px-[100px] px-[10px]">
                <SharesTariffs/>
                <PrivateTarrifs/>
                <IpoTarrifs/>
            </div>
        </div>
    )
}