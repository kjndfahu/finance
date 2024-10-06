import photo from '../../../assets/wealth.svg'
import Image from 'next/image'
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const IpoTarrifs:React.FC<Props> = ({className}) => {
    const t = useTranslations('IPOTarrifs')
    return (
        <div className="flex flex-col justify-between rounded-[30px] bg-[#fff3db] border-[1px] border-[#f2c87b] text-black text-[18px] w-full ">
            <div className="flex flex-col pt-7 px-5 gap-5">
                <div className="flex flex-col ">
                    <h2 className="text-[32px] font-semibold">{t('ipo')}</h2>
                    <h3 className="text-[20px] text-[#b0b0b0] font-semibold">{t('from')}</h3>
                </div>
                <p>{t('individual-participation')}<br/> {t('yield')}<br/> {t('%')}</p>
                <p>{t('working-period')}<br/> {t('days')}</p>
                <p>{t('profit')}<br/> {t('daily')}</p>
                <p>{t('partner-participation')}<br/>
                    {t('contact-support')}</p>
            </div>
            <Image className="w-full rounded-b-[25px]" src={photo} alt="photo"/>
        </div>
    )
}