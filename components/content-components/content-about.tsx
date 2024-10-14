import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const ContentAbout:React.FC<Props> = ({className}) => {
    const t = useTranslations('ContentAbout')
    return (
    <div className="flex flex-row items-center justify-between lg:px-[120px] mdbvp:px-[60px] lg:py-[70px] mdbvp:py-[30px] smbvp:px-[30px] px-[10px] py-[20px]  mdbvp:rounded-[40px] smbvp:rounded-[10px] bg-[radial-gradient(100%_100%_at_100%_100%,rgba(248,172,255,.2),rgba(105,110,255,.2))]">
        <div className="flex flex-col mdbvp:gap-5 gap-2">
            <h3 className="text-[#b0b0b0] lg:text-[20px] lg:leading-[20px] mdbvp:text-[15px] mdbvp:leading-[15px] smbvp:text-[12px] text-[10px] font-semibold">{t('about')}</h3>
            <h2 className="lg:text-[56px] lg:leading-[56px] mdbvp:text-[32px] mdbvp:leading-[32px] smbvp:text-[24px] text-[17px] leading-[17px] smbvp:leading-[24px] font-semibold text-black">{t('finance')}</h2>
            <h4 className="lg:text-[20px] lg:leading-[20px] mdbvp:text-[15px] mdbvp:leading-[15px] smbvp:text-[12px] text-[10px] leading-[10px] smbvp:leading-[12px] text-black">{t('text1')}<br/> t{t('text2')}</h4>
            <div className="flex items-center bg-[#15B0DB] lg:text-[18px] lg:leading-[18px] mdbvp:text-[15px] mdbvp:leading-[15px] text-[12px] leading-[12px] mdbvp:rounded-[10px] rounded-[3px] lg:w-[150px] mdbvp:w-[120px] w-[80px] mdbvp:py-2 py-1 mdbvp:px-7 px-3 font-semibold justify-center text-white">{t('btn')}</div>
        </div>
        <img className="lg:w-[500px] lg:h-[420px] mdbvp:w-[320px] mdbvp:h-[280px] smbvp:w-[250px] smbvp:h-[180px] w-[100px] h-[75px]" src="https://raison.app/_nuxt/img/decoration-cubes-3x.3835fcc.webp" alt="abstract"/>
    </div>
)
}