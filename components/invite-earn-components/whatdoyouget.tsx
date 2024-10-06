import {useTranslations} from "next-intl";

export const Whatdoyouget:React.FC = () => {
    const t = useTranslations('Whatdoyouget')
    return (
        <div className="flex flex-row items-center justify-between text-black w-full gap-[70px] mt-16 px-[100px]">
            <div className=" w-[50%] rounded-[35px]">
                <img className="h-[280px]" src="https://raison.app/img/referral/art.webp" alt=""/>
            </div>
            <div className="flex flex-col text-black w-[50%] gap-10">
                <h2 className="text-[42px] leading-[45px] font-semibold">{t('title')}</h2>
                <div className="flex flex-col gap-2">
                    <p className="text-[20px] leading-[26px]">{t('text')}</p>
                </div>
            </div>
        </div>
    )
}
