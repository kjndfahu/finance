import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const InvestmentManagement:React.FC<Props> = ({className})=>{
    const t = useTranslations('InvestmentManagement')
    return (
        <div className="flex flex-row justify-between px-[120px] py-[75px] bg-[radial-gradient(545.69%_145.84%_at_106.15%_100%,hsla(3,97%,71%,.2)_0,rgba(44,62,80,.2)_100%)] rounded-[40px]">
            <div className="flex flex-col gap-5">
                <h3 className="text-[#b0b0b0] text-[20px] font-semibold">{t("investment-management")}</h3>
                <h2 className="text-[56px] leading-[56px] font-semibold text-black">{t("title")}<br/> {t("title2")}<br/> {t("title3")}</h2>
                <h4 className="text-[20px] text-black">{t("text")}<br/> {t("text2")}</h4>
                <div className="flex items-center bg-[#15B0DB] rounded-[10px] w-[150px] py-2 px-7 font-semibold justify-center text-white">{t("btn")}</div>
            </div>
            <img className="w-[500px]" src="https://raison.app/img/investmentManagement/puzzle.png" alt="abstract"/>
        </div>
    )
}