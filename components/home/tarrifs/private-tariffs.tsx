import photo from '../../../assets/growth.svg'
import Image from 'next/image'
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const PrivateTarrifs:React.FC<Props> = ({className}) => {
    const t = useTranslations('PrivateTarrifs')
    return (
        <div className="flex flex-col rounded-[30px] justify-between bg-[#d0e8dc] border-[1px] border-[#8dbfa6] text-black text-[18px] w-full">
            <div className="flex flex-col pt-7 px-5 gap-5">
                <div className="flex flex-col ">
                    <h2 className="text-[32px] font-semibold">{t('private-markets')}</h2>
                    <h3 className="text-[20px] text-[#b0b0b0] font-semibold">{t('from')}</h3>
                </div>
                <p>{t('yield')}<br/> {t('%')}</p>
                <p>{t('working-period')}<br/> {t('days')}</p>
                <p>{t('profit')}<br/> {t('daily')}</p>
                <p>{t('invest-in')}<br/> {t('stage')}<br/> {t('late-stage')}</p>
            </div>
            <Image className="w-full rounded-b-[25px]" src={photo} alt="photo"/>
        </div>
    )
}