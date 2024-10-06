import {Copy} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const ReferralLink:React.FC<Props> = ({className})=>{
    const t = useTranslations('Refferal')
    return (
        <div className="flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <h2 className="text-[18px] text-[#777777] mt-3">{t('personal-reference:')}</h2>
            <div
                className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] p-3 text-[#777777] gap-3">
                <h4 className="text-blue-500 font-semibold text-[18px]">https://alliance.invest/refnickname</h4>
                <Copy width={19} />
            </div>
        </div>
    )
}