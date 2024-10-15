import photo from '../../../public/assets/launch.svg'
import Image from 'next/image'
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const SharesTariffs:React.FC<Props> = ({className}) => {
    const t = useTranslations('SharesTariffs')
    return (
        <div className="flex flex-col justify-between rounded-[30px] bg-[#d3f0f8] border-[1px] border-[#83c9db] text-black text-[18px] w-full">
            <div className="flex flex-col pt-7 px-5 gap-5">
                <div className="flex flex-col ">
                    <h2 className="text-[32px] font-semibold">{t('stocks-etf')}</h2>
                    <h3 className="text-[20px] text-[#b0b0b0] font-semibold">{t('from')}</h3>
                </div>
                <p>{t('yield')}<br/> {t('%')}</p>
                <p>{t('working-period')}<br/> {t('days')}</p>
                <p>{t('profit')}<br/> {t('daily')}</p>
                <p>{t('purchase')}<br/> {t('team')}</p>
            </div>
            <Image className="w-full rounded-b-[25px]" src={photo} alt="photo"/>
        </div>
    )
}