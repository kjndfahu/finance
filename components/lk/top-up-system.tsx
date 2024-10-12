'use client'
import {Tether, Trx} from "../icons";
import {useTranslations} from "next-intl";
import {useState} from "react";

interface Props{
    className?:string;
    isSystem?:string;
    setSystem: any;
}

export const TopUpSystem:React.FC<Props> = ({isSystem, setSystem, className})=>{
    const t = useTranslations("TopUpPersonal")
    return (
        <div className="flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-5 rounded-[10px]">
            <h4 className="text-[16px] text-[#777777]">{t('choosesystem')}</h4>
            <div className="flex flex-row justify-between gap-5">
                <div
                    onClick={() => setSystem('TRC-20')}
                    className={`${isSystem==='TRC-20' ? 'bg-[#f5f5f5]' : 'bg-white'} cursor-pointer flex flex-row items-center gap-3 w-full border-[1px] border-[#b0b0b0] rounded-[5px] px-2 py-2`}>
                    <Tether className="w-[30px] h-[30px]"/>
                    <h2>USDT (TRC-20)</h2>
                </div>
                <div
                    onClick={() => setSystem('BEP-20')}
                    className={`${isSystem==='BEP-20' ? 'bg-[#f5f5f5]' : 'bg-white'} cursor-pointer flex flex-row items-center gap-3 w-full border-[1px] border-[#b0b0b0] rounded-[5px] px-2 py-2`}>
                    <Tether className="w-[30px] h-[30px]"/>
                    <h2>USDT (BEP-20)</h2>
                </div>
                <div
                    onClick={() => setSystem('BUSDT')}
                    className={`${isSystem==='BUSDT' ? 'bg-[#f5f5f5]' : 'bg-white'} cursor-pointer flex flex-row items-center gap-3 w-full border-[1px] border-[#b0b0b0] rounded-[5px] px-2 py-2`}>
                    <Tether className="w-[30px] h-[30px]"/>
                    <h2>BUSDT (BEP-20)</h2>
                </div>
                <div
                    onClick={() => setSystem('TRON')}
                    className={`${isSystem==='TRON' ? 'bg-[#f5f5f5]' : 'bg-white'} cursor-pointer flex flex-row items-center gap-3 w-full border-[1px] border-[#b0b0b0] rounded-[5px] px-2 py-2`}>
                    <Trx className="w-[30px] h-[30px]"/>
                    <h2>TRX (TRON)</h2>
                </div>
            </div>
        </div>
    )
}