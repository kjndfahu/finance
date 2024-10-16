import {useTranslations} from "next-intl";

interface Props{
    className?:string;
    handleChange:any;
    session:any;
    handleWholeBalanceClick:any;
    value:any;
}

export const DepositAmountBalance:React.FC<Props> = ({value, handleWholeBalanceClick, session, handleChange, className})=>{
    const t = useTranslations("CreateDeposit")

    return (
        <div className="flex flex-col md:gap-5 text-black bg-white border-[1px] border-[#f5f5f5] px-4 md:py-4 py-2 rounded-[10px]">
            <div className="md:w-[50%] w-full">
                <h4 className="md:text-[16px] text-[13px] text-[#777777]">{t('deposit-amount')}</h4>
                <div
                    className="flex flex-row items-center justify-between md:text-[18px] text-[13px] md:px-4 px-2 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                    <input value={value} onChange={handleChange} placeholder={t('typing')}
                           className="w-[70%] bg-white border-transparent focus:outline-0" type="text"/>
                    <h2 onClick={handleWholeBalanceClick} className="text-[15px] cursor-pointer text-blue-500">{t('whole-balance')}</h2>
                </div>
            </div>
        </div>
    )
}
