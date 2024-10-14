import {useTranslations} from "next-intl";

export const StartNowInvest:React.FC= () => {
    const t = useTranslations('StartNowInvest')
    return (
        <div className="flex mdbvp:flex-row flex-col items-center justify-between text-black w-full smbvp:gap-[70px] gap-[20px] mt-16 mdbvp:px-[100px]">
            <div className="flex flex-col mdbvp:text-left text-center text-black mdbvp:w-[50%] gap-10">
                <h2 className="md:text-[42px] md:leading-[45px] text-[28px] leading-[28px] font-semibold">{t('title1')}</h2>
                <p className="text-[20px] leading-[23px]">{t('text1')}</p>
            </div>
            <div className="flex justify-end mdbvp:w-[50%] height-[300px] rounded-[35px]">
                <img className="h-[300px]" src="https://raison.app/img/launch/raison-app.webp" alt=""/>
            </div>
        </div>
    )
}