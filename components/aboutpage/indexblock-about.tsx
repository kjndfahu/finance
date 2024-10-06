import cube from '../../assets/cube.png'
import Image from 'next/image'
import {useTranslations} from "next-intl";

export const IndexblockAbout:React.FC = () => {
    const t = useTranslations('IndexblockAbout')
    return (
        <div className="flex flex-row justify-between gap-16 px-[100px] mt-[75px]">
            <div className="flex flex-col justify-center gap-5 text-left text-black w-[550px]">
                <h2 className="text-[48px] font-semibold">{t('indexes')}</h2>
                <p className="text-[22px]">{t('text')}</p>
            </div>
            <Image className="w-[450px]" src={cube} alt="cube"/>
        </div>
    )
}