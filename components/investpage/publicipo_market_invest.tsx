import {useTranslations} from "next-intl";

export const PublicIPOMarketInvest:React.FC = () => {
    const t = useTranslations('PublicIPOMarketInvest')
    return (
        <div className="flex mdbvp:flex-row flex-col items-center justify-between text-black w-full smbvp:gap-[70px] gap-[20px] mt-16 mdbvp:px-[100px]">
            <div className="mdbvp:w-[50%] rounded-[35px]">
                <img  className="h-[290px]" src="https://raison.app/img/stocksEtf/arrows.png" alt=""/>
            </div>
            <div className="flex flex-col mdbvp:text-left text-center text-black mdbvp:w-[50%] gap-10">
                <h2 className="md:text-[42px] md:leading-[45px] text-[28px] leading-[28px] font-semibold">{t('title1')}</h2>
                <div className="flex flex-col gap-3">
                    <p className="text-[18px] leading-[23px]">{t('text1')}</p>
                    <p className="text-[18px] leading-[23px]">{t('text2')}</p>
                    <p className="text-[18px] leading-[23px]">{t('text3')}</p>
                    <p className="text-[18px] leading-[23px]">{t('text4')}</p>
                </div>
            </div>
        </div>
    )
}