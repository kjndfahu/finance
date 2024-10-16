import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const InvestIPOAbout:React.FC<Props> = ({}) => {
    const t = useTranslations('InvestIPOAbout')
    return (
        <div
            className="flex mt-[50px] items-center lg:py-[50px] mdbvp:py-[40px] smbvp:py-[30px] py-[20px] flex-row rounded-[20px] justify-center mdbvp:gap-[150px] smbvp:gap-[75px] bg-[#E7FAFD]">
            <div className="flex flex-col mdbvp:gap-7 gap-3">
                <h4 className="mdbvp:text-[20px] smbvp:text-[15px] text-[12px] font-semibold text-[#b0b0b0]">IPO</h4>
                <h2 className="font-semibold text-black mdbvp:text-[50px] mdbvp:leading-[43px] md:text-[32px] md:leading-[32px] text-[17px] leading-[17px]">{t('title1')}<br/> {t('title2')}</h2>
                <p className="mdbvp:text-[20px] mdbvp:leading-[20px] md:text-[15px] md:leading-[15px] text-[10px] leading-[10px] text-black font-thin">{t('text1')}</p>
                <div
                    className="flex items-center bg-[#15B0DB] lg:text-[18px] lg:leading-[18px] mdbvp:text-[15px] mdbvp:leading-[15px] text-[12px] leading-[12px] mdbvp:rounded-[10px] rounded-[3px] lg:w-[150px] mdbvp:w-[120px] w-[80px] mdbvp:py-2 py-1 mdbvp:px-7 px-3 font-semibold justify-center text-white">
                    {t('btn')}
                </div>
            </div>
            <img className="mdbvp:w-[400px] md:w-[250px] w-[150px]" src="https://raison.app/_ipx/_/img/stocksEtf/growth.png" alt="phone"/>
        </div>
    )
}