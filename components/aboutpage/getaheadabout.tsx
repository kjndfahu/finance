import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const GetAheadAbout:React.FC<Props> = ({className}) => {
    const t = useTranslations('GetAheadAbout')
    return (
        <div className="flex flex-row items-center justify-between text-black w-full gap-[70px] mt-16 px-[100px]">
            <div className="flex flex-col text-black w-[50%] gap-7">
                <h2 className="text-[42px] leading-[45px] font-semibold">{t('title1')}</h2>
                <p className="text-[20px] leading-[23px]">{t('text1')}</p>
                <div
                    className="flex items-center bg-[#15B0DB] rounded-[10px] w-[150px] py-2 px-7 font-semibold justify-center text-white">
                    {t('btn')}
                </div>
            </div>
            <div className="flex justify-end  w-[50%] height-[300px] rounded-[35px]">
                <img className="h-[300px]" src="https://raison.app/img/ventures/rocket.webp" alt=""/>
            </div>
        </div>
    )
}