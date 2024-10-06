import abstract from '../../assets/abstract.png';
import Image from "next/image";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const AboutFirst:React.FC<Props> = ({className})=>{
    const t = useTranslations('AboutFirst')
    return (
        <div className="flex flex-row justify-between px-[120px] py-[150px] bg-[#f3f4eb] rounded-[40px]">
            <div className="flex flex-col gap-5">
                <h3 className="text-[#b0b0b0] text-[20px] font-semibold">{t('indexes')}</h3>
                <h2 className="text-[56px] leading-[56px] font-semibold text-black">{t('reliable-source')}<br/> {t('income')}</h2>
                <h4 className="text-[20px] text-black">{t('yield')}<br/> {t('tenure')}</h4>
                <div className="flex items-center bg-[#15B0DB] rounded-[10px] w-[150px] py-2 px-7 font-semibold justify-center text-white">{t('login')}</div>
            </div>
            <Image className="w-[400px]" src={abstract} alt="abstract"/>
        </div>
    )
}