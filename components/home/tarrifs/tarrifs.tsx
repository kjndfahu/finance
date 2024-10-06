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
        <div className="flex flex-col items-center py-[75px] rounded-[50px] mt-[40px] justify-center w-full bg-[#F5F5F5]">
            <div className="flex flex-col text-center gap-5">
                <h2 className="text-[18px] text-[#b0b0b0] leading-[18px] font-semibold">{t('account-plans')}</h2>
                <h1 className="text-black text-[48px] leading-[48px] font-semibold">{t('choose-path')}</h1>
            </div>

            <div className="flex flex-row mt-[60px] gap-5 w-full px-[100px]">
                <SharesTariffs/>
                <PrivateTarrifs/>
                <IpoTarrifs/>
            </div>
        </div>
    )
}