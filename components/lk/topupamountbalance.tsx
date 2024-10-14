'use client'
import {useTranslations} from "next-intl";
import {TransactionsAdresses} from "./transactions-addresses";
import {useCallback, useState} from "react";
import debounce from 'debounce';

interface Props{
    className?:string;
    isSystem?:string;
    session:any;
}

export const TopUpAmountBalance:React.FC<Props> = ({session, isSystem, className})=>{
    const t = useTranslations("WithdrawPersonal")
    const [isClicked, setIsClicked] = useState(false)
    const [value, setValue] = useState('');

    const debouncedSetValue = useCallback(
        debounce((newValue: string) => setValue(newValue), 500),
        []
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetValue(event.target.value);
    };

    console.log(value)

    return (
        <>
            {isClicked ? (
                <TransactionsAdresses session={session} isSystem={isSystem} value={value} setIsClicked={setIsClicked}/>
            ) : (
                <div
                    className="flex flex-col md:gap-5 gap-2 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px]">
                    <h4 className="md:text-[16px] text-[13px] text-[#777777]">{t('enter-withdraw')}</h4>
                    <div
                        className="flex flex-row items-center text-[18px] md:px-4 px-2 md:py-2  gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                        <input onChange={handleChange} placeholder="Начните вводить..."
                               className="md:text-[18px] text-[14px] w-[88%] bg-white border-transparent focus:outline-0" type="number"/>
                        <h2 className="md:text-[15px] text-[10px] cursor-pointer text-blue-500">{t('whole-balance')}</h2>
                    </div>
                    <div
                        onClick={() => setIsClicked(true)}
                        className={`flex cursor-pointer md:text-[16px] text-[13px] items-center justify-center bg-blue-600 text-white rounded-[7px] md:py-3 py-1 hover:bg-blue-700`}>{t('request-withdrawal')}
                    </div>
                </div>
            )}

        </>
    )
}