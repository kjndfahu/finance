import {Copy} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const TransactionsAdresses:React.FC<Props> = ({className})=>{
    const t = useTranslations("TopUpPersonal")
    return (
        <div className="flex flex-col gap-5 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px]">
            <h4 className="text-[16px] text-[#777777]">{t('address-send')}</h4>
            <div className="flex flex-row items-center gap-5">
                <h2 className="text-[20px] text-black">TRRFjhYT765F6RFkht5jfidu4h7jhyhg6</h2>
                <Copy color="#777777"/>
            </div>
            <h4 className="text-[16px] text-[#777777]">{t('send-balance')}</h4>
            <div className="flex flex-col gap-4 text-[17px]">
                <div className="flex items-center justify-center bg-blue-600 text-white rounded-[7px] py-3">{t('paid')}
                </div>
                <div className="flex items-center justify-center text-black rounded-[7px] py-3">{t('cancel-deposit')}
                </div>
            </div>
        </div>
    )
}