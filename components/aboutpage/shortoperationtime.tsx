import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const ShortOperationTime:React.FC<Props> = ({className}) => {
    const t = useTranslations('CapitalGainsAbout')
    return (
        <div className="flex mdbvp:flex-row flex-col justify-between items-center text-blackw-full smbvp:gap-[70px] gap-[20px] mt-16 mdbvp:px-[100px]">
            <div className="flex flex-col  mdbvp:text-left text-center text-black mdbvp:w-[50%] mdbvp:gap-10 gap-2">
                <h2 className="md:text-[42px] md:leading-[45px] text-[28px] leading-[28px] font-semibold">{t('title1')}</h2>
                <p className="text-[20px] leading-[23px]">{t('text1')}</p>
            </div>
            <div className="flex justify-end mdbvp:w-[50%] height-[300px] rounded-[35px]">
                <img className="h-[300px]" src="https://raison.app/img/stocksEtf/coins.png" alt=""/>
            </div>
        </div>
    )
}