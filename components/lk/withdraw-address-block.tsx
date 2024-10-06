import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const WithdrawAddressBlock:React.FC<Props> = ({className})=>{
    const t = useTranslations("WithdrawPersonal")
    return (
        <div className="flex flex-col gap-5 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px]">
            <h4 className="text-[16px] text-[#777777]">{t('enter-address')}</h4>
            <div
                className="flex flex-row items-center text-[18px] px-4 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                <input placeholder={t('typing')}
                       className="w-full bg-white border-transparent focus:outline-0" type="text"/>
            </div>
        </div>
    )
}