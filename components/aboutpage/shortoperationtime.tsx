import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const ShortOperationTime:React.FC<Props> = ({className}) => {
    const t = useTranslations('ShortOperationTime')
    return (
        <div className="flex flex-row justify-between items-center text-black w-full gap-[70px] mt-16 px-[100px]">
            <div className="flex flex-col text-black w-[50%] gap-10">
                <h2 className="text-[42px] leading-[45px] font-semibold">{t('title1')}</h2>
                <p className="text-[20px] leading-[23px]">{t('text1')}</p>
            </div>
            <div className="flex justify-end  w-[50%] height-[300px] rounded-[35px]">
                <img className="h-[300px]" src="https://raison.app/img/stocksEtf/coins.png" alt=""/>
            </div>
        </div>
    )
}