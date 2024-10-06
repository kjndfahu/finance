import {useTranslations} from "next-intl";

interface Props {
    className?: string;
}
export const Transactions:React.FC<Props> = ({className}) => {
    const t = useTranslations('AccountPersonal')
    return (
        <div className="flex gap-5 w-full text-[#777777] mt-1 text-[15px]">
            <div className="flex gap-3 flex-col w-[50%]">
                <h4>{t('deposited')}</h4>
                <div className="border-[1px] border-[#b0b0b0] h-[150px] rounded-[10px]"></div>
            </div>
            <div className="flex gap-3 flex-col w-[50%]">
                <h4>{t('withdrawn')}</h4>
                <div className="border-[1px] border-[#b0b0b0] h-[150px] rounded-[10px]"></div>
            </div>
        </div>
    )
}