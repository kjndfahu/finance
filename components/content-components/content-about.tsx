import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const ContentAbout:React.FC<Props> = ({className}) => {
    const t = useTranslations('ContentAbout')
    return (
    <div className="flex flex-row items-center justify-between px-[120px] py-[75px] rounded-[40px] bg-[radial-gradient(100%_100%_at_100%_100%,rgba(248,172,255,.2),rgba(105,110,255,.2))]">
        <div className="flex flex-col gap-7">
            <h3 className="text-[#b0b0b0] text-[20px] font-semibold">{t('about')}</h3>
            <h2 className="text-[56px] leading-[56px] font-semibold text-black">{t('finance')}</h2>
            <h4 className="text-[20px] text-black">{t('text1')}<br/> t{t('text2')}</h4>
            <div className="flex items-center bg-[#15B0DB] rounded-[10px] w-[150px] py-2 px-7 font-semibold justify-center text-white">{t('btn')}</div>
        </div>
        <img className="w-[400px]" src="https://raison.app/_nuxt/img/decoration-cubes-3x.3835fcc.webp" alt="abstract"/>
    </div>
)
}