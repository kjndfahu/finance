import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const WhyInvestAbout:React.FC<Props> = ({className}) => {
    const t = useTranslations('WhyInvestAbout')
    return (
        <div className="flex flex-row justify-between items-center text-black w-full gap-[70px] mt-16 px-[100px]">
            <div className="flex flex-col text-black w-[50%] gap-10">
                <h2 className="text-[42px] leading-[45px] font-semibold">{t('title1')}<br/> {t('title2')}</h2>
                <p className="text-[20px] leading-[23px]">{t('text')}</p>
            </div>
            <div className="flex justify-end  w-[50%] height-[300px] rounded-[35px]">
                <img className="h-[300px]" src="https://raison.app/img/ventures/money_tree.webp" alt=""/>
            </div>
        </div>
    )
}