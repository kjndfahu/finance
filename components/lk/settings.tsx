import {Copy} from "lucide-react";
import {useTranslations} from "next-intl";

interface Props{
    className?:string;
}

export const Settings:React.FC<Props> = ({className}) => {
    const t = useTranslations('Settings')
    return (
        <div className="flex flex-col gap-10 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <h4 className="text-[22px]">{t('settings')}</h4>
            <div className="flex flex-row gap-20">
                <div className="flex flex-col gap-3 text-[#777777] text-[19px]">
                    <div className="flex flex-col">
                        <h1>{t('mail')}</h1>
                        <div
                            className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="text-[18px]">igorpro@gmail.com</h4>
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <h1>{t('name')}</h1>
                        <div
                            className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="text-[18px]">Игорь</h4>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1>{t('surname')}</h1>
                        <div
                            className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="text-[18px]">Байден</h4>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 text-[#777777] text-[19px]">
                    <div className="flex flex-col">
                        <h1>{t('phone')}</h1>
                        <div
                            className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="text-[18px]">+79528127365</h4>
                        </div>
                    </div>
                    <div className="flex flex-col ">
                        <h1>{t('region')}</h1>
                        <div
                            className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="text-[18px]">Россия</h4>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1>{t('telegram')}</h1>
                        <div
                            className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="text-[18px]">@bosinn</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}