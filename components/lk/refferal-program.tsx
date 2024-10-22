'use client'
import {ReferralLink} from "./referal-link";
import {useTranslations} from "next-intl";
import {usePathname} from "next/navigation";
import {generateStaticParams} from "../../src/app/[locale]/(personal-account)/affilate-program/page";

interface Props{
    className?:string;
    session:any;
}

export const ReferralProgram:React.FC<Props> = ({ session, className})=>{
    const t = useTranslations('Refferal')

    return (
        <div className="flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <h4 className="text-[22px]">{t('programme')}</h4>
            <h2 className="text-[18px] text-[#777777] mt-3">{t('invite')}</h2>
            <div
                className="flex flex-col bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] p-3 text-[#777777] gap-3">
                <p>{t('every')}</p>
                <p>{t('company')}</p>
                <div className="flex flex-col">
                    <p className="text-[#4f4b4b]">{t('remuneration')}</p>
                    <p className="text-green-500">{t('8')}</p>
                    <p className="text-green-500">{t('6')}</p>
                    <p className="text-green-500">{t('3')}</p>
                </div>
                <div className="flex flex-col">
                    <p className="text-[#4f4b4b]">{t('example')}</p>
                    <p>{t('person')}</p>
                </div>
            </div>

            <ReferralLink session={session}/>
        </div>
    )
}