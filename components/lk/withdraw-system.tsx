'use client'
import {Tether, Trx} from "../icons";
import {useTranslations} from "next-intl";
import {useState} from "react";

interface Props{
    className?:string;
    isSystem?:string;
    setSystem: any;
}

export const WithdrawSystem:React.FC<Props> = ({isSystem, setSystem, className})=>{
    const t = useTranslations("WithdrawPersonal")
    return (
        <div className="flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] md:px-4 px-2 md:py-5 py-2 rounded-[10px]">
            <h4 className="md:text-[16px] text-[13px] text-[#777777]">{t('choosesystem')}</h4>
            <div className="flex flex-row justify-between md:gap-5 gap-1">
                <div
                    onClick={() => setSystem('TRC-20')}
                    className={`${isSystem === 'TRC-20' ? 'bg-[#f5f5f5]' : 'bg-white'} cursor-pointer flex flex-row items-center md:gap-3 gap-1 w-full border-[1px] border-[#b0b0b0] rounded-[5px] md:px-2 md:py-2 px-1`}>
                    <Tether className="w-[30px] h-[30px]"/>
                    <h2 className="md:text-[16px] text-[11px]">USDT (TRC-20)</h2>
                </div>
                <div
                    onClick={() => setSystem('BEP-20')}
                    className={`${isSystem === 'BEP-20' ? 'bg-[#f5f5f5]' : 'bg-white'} cursor-pointer flex flex-row items-center md:gap-3 gap-1 w-full border-[1px] border-[#b0b0b0] rounded-[5px] md:px-2 md:py-2 px-1`}>
                    <Tether className="w-[30px] h-[30px]"/>
                    <h2 className="md:text-[16px] text-[11px]">USDT (BEP-20)</h2>
                </div>
                <div
                    onClick={() => setSystem('BUSDT')}
                    className={`${isSystem === 'BUSDT' ? 'bg-[#f5f5f5]' : 'bg-white'} cursor-pointer flex flex-row items-center md:gap-3 gap-1 w-full border-[1px] border-[#b0b0b0] rounded-[5px] md:px-2 md:py-2 px-1`}>
                    <Tether className="w-[30px] h-[30px]"/>
                    <h2 className="md:text-[16px] text-[11px]">BUSDT (BEP-20)</h2>
                </div>
                <div
                    onClick={() => setSystem('TRON')}
                    className={`${isSystem === 'TRON' ? 'bg-[#f5f5f5]' : 'bg-white'} cursor-pointer flex flex-row items-center md:gap-3 gap-1 w-full border-[1px] border-[#b0b0b0] rounded-[5px] md:px-2 md:py-2 px-1`}>
                    <Trx className="w-[30px] h-[30px]"/>
                    <h2 className="md:text-[16px] text-[11px]">TRX (TRON)</h2>
                </div>
            </div>
        </div>
    )
}