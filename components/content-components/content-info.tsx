import {useTranslations} from "next-intl";

export const ContentInfo:React.FC = () => {
    const t = useTranslations('ContentInfo')
    return (
        <div className="flex flex-col w-full gap-10 p-3 bg-[#f5f5f5] rounded-[10px] mt-10">
            <div className="bg-[#b0b0b0] w-full h-[1px]"></div>
            <p className="text-[16px] text-[#b0b0b0] mb-5">{t('text')}</p>
        </div>
    )
}