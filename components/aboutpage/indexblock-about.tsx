import cube from '../../assets/cube.png'
import Image from 'next/image'
import {useTranslations} from "next-intl";

export const IndexblockAbout:React.FC = () => {
    const t = useTranslations('IndexblockAbout')
    return (
        <div className="flex lg:flex-row flex-col items-center justify-between md:gap-16 smbvp:gap-7 gap-3 md:px-[100px] md:mt-[75px] mt-[25px]">
            <div className="flex flex-col items-center justify-center gap-5 lg:text-left text-center text-black lg:w-[550px] w-full">
                <h2 className="md:text-[48px] text-[28px] leading-[28px] md:leading-[48px] font-semibold">{t('indexes')}</h2>
                <p className="md:text-[22px] smbvp:text-[18px]">{t('text')}</p>
            </div>
            <Image className="w-[450px]" src={cube} alt="cube"/>
        </div>
    )
}