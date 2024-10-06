import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const DepositAmountBalance:React.FC<Props> = ({className})=>{
    const t = useTranslations("CreateDeposit")
    return (
        <div className="flex flex-col gap-5 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px]">
            <div className="w-[50%]">
                <h4 className="text-[16px] text-[#777777]">{t('deposit-amount')}</h4>
                <div
                    className="flex flex-row items-center justify-between text-[18px] px-4 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                    <input placeholder={t('typing')}
                           className="w-[70%] bg-white border-transparent focus:outline-0" type="text"/>
                    <h2 className="text-[15px] cursor-pointer text-blue-500">{t('whole-balance')}</h2>
                </div>
            </div>
        </div>
    )
}
