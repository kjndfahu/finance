'use client'
import {DepositTopUp} from "./deposit-topup";

import {DepositAmountBalance} from "./deposit-amount-balance";
import {DepositTarrifPlan} from "./deposit-tarrif-plan";
import {useCallback, useState} from "react";
import debounce from "debounce";

interface Props{
    className?:string;
    session:any;
}

export const AllDeposit:React.FC<Props> = ({session, className})=>{
    const [value, setValue] = useState('');
    const debouncedSetValue = useCallback(
        debounce((newValue: string) => setValue(newValue), 500),
        []
    );
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetValue(event.target.value);
    };
    return (
        <div className="flex min-h-screen flex-col bg-[#f5f5f5] w-full md:gap-5 gap-2">
            <DepositTopUp session={session}/>
            <DepositAmountBalance handleChange={handleChange}/>
            <DepositTarrifPlan session={session} value={value}/>
        </div>
    )
}