import {useTranslations} from "next-intl";

export const SelectoppAbout:React.FC = () => {
    const t = useTranslations('SelectoppAbout')
    return (
        <div className="flex mdbvp:flex-row flex-col items-center justify-between text-black w-full smbvp:gap-[70px] gap-[20px] mt-16 mdbvp:px-[100px]">
            <div className="mdbvp:w-[50%] rounded-[35px]">
                <img  className="h-[350px]" src="https://raison.app/img/ventures/brain.webp" alt=""/>
            </div>
            <div className="flex flex-col mdbvp:text-left text-center text-black mdbvp:w-[50%] gap-10">
                <h2 className="md:text-[42px] md:leading-[45px] text-[28px] leading-[28px] font-semibold">{t('title1')}<br/> {t('title2')}</h2>
                <div className="flex flex-col gap-2">
                    <p className="text-[20px] leading-[26px]">{t('text1')}</p>
                    <p className="text-[20px] leading-[26px]">{t('text2')}</p>
                </div>
            </div>
        </div>
    )
}
