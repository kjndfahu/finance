import phone from '../../public/assets/firstscreen.png'
import Image from 'next/image'
import {useTranslations} from "next-intl";

export const Trackerblock:React.FC = () => {
    const t = useTranslations('TrackerBlock')
    return (
        <div className="flex mdbvp:mt-[75px] mt-[30px] items-center flex-row rounded-[20px] justify-center mdbvp:gap-[120px] gap-0 mdbvp:px-0 md:px-10 px-3 bg-cover bg-center bg-[radial-gradient(100%_100%_at_100%_100%,#f5e5ff_0,rgba(245,229,255,0)_55.92%),radial-gradient(105.27%_105.27%_at_-5.27%_3.34%,#e8febf_0,hsla(81,97%,87%,0)_62.69%),radial-gradient(100%_100%_at_100%_0,#ce80ff_0,#f7b3ed_44.95%,#ffcae2_73.96%,#ffbfc4_100%)]">
            <div className="flex flex-col md:gap-5 gap-2">
                <h2 className="font-semibold text-black mdbvp:text-[50px] mdbvp:leading-[43px] md:text-[32px] md:leading-[32px] text-[18px] leading-[18px]">{t('monitor-assets')}<br/> {t('investment-tracker')}</h2>
                <p className="mdbvp:text-[20px] mdbvp:leading-[20px] md:text-[15px] md:leading-[15px] text-[12px] leading-[12px] text-black font-thin">{t('revolutionize')}</p>
            </div>
            <Image className="mdbvp:pt-[120px] md:pt-[70px] pt-[40px] mdbvp:w-[420px] md:w-[250px] w-[150px]" src={phone} alt="phone"/>
        </div>
    )
}
