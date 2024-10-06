import {Eye, Lock} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const ChangingPasswordSettings:React.FC<Props> = ({className}) => {
    const t = useTranslations('Settings')
    return (
        <div className="flex flex-col gap-10 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <h4 className="text-[22px]">{t('сhange-password')}</h4>
                <div className="flex flex-col gap-3 text-[#777777] text-[19px]">
                    <div className="flex flex-col">
                        <h1>{t('old-password')}</h1>
                        <div
                            className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                            <Lock width={20} color="#b0b0b0"/>
                            <input placeholder="*****"
                                   className="w-full bg-white border-transparent focus:outline-0" type="text"/>
                            <Eye width={20} color="#b0b0b0"/>
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <h1>{t('new-password')}</h1>
                        <div
                            className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                            <Lock width={20} color="#b0b0b0"/>
                            <input placeholder="*****"
                                   className="w-full bg-white border-transparent focus:outline-0" type="text"/>
                            <Eye width={20} color="#b0b0b0"/>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1>{t('confirm-password')}</h1>
                        <div
                            className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                            <Lock width={20} color="#b0b0b0"/>
                            <input placeholder="*****"
                                   className="w-full bg-white border-transparent focus:outline-0" type="text"/>
                            <Eye width={20} color="#b0b0b0"/>
                        </div>
                    </div>
                </div>
        </div>
    )
}