import {useTranslations} from "next-intl";

export const ContentInfo:React.FC = () => {
    const t = useTranslations('ContentInfo')
    return (
        <div className="flex flex-col w-full gap-10 p-3 bg-[#f5f5f5] rounded-[10px] lg:mt-10 mdbvp:mt-7 smbvp:mt-5 mt-3">
            <div className="bg-[#b0b0b0] w-full h-[1px]"></div>
            <p className="lg:text-[16px] mdbvp:text-[14px] text-[12px] text-[#b0b0b0] mb-5">{t('text')}</p>
        </div>
    )
}