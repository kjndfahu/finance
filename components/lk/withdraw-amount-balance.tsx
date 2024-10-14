'use client'
import {useTranslations} from "next-intl";
import {useCallback, useState} from "react";
import debounce from "debounce";
import toast from "react-hot-toast";

interface Props{
    className?:string;
    value:string;
    isSystem:any;
    session:any;
}

export const WithdrawAmountBalance:React.FC<Props> = ({session, isSystem, value, className})=>{
    const t = useTranslations("WithdrawPersonal")
    const [count, setCount] = useState(0)
    const debouncedSetValue = useCallback(
        debounce((newValue: number) => setCount(newValue), 500),
        []
    );

    const handleChange = (event) => {
        debouncedSetValue(event.target.value);
    };

    const handleWithdrawRequest = async () => {
        try {
            const email = session?.user.email;
            const method = isSystem;
            const amount = count;
            const paymentDetails = value;

            const response = await fetch('/api/withdrawrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    method,
                    amount,
                    paymentDetails
                }),
            });

            if (response.ok) {
                toast.success("Success");
                console.log("Withdrawal request submitted successfully");
            } else {
                const errorData = await response.json();
                console.error("Failed to submit the withdrawal request", errorData);
                toast.error("Error");
            }
        } catch (error) {
            console.error("Error submitting the withdrawal request:", error);
            toast.error("Error");
        }
    };

    return (
        <div className="flex flex-col md:gap-5 gap-2 text-black bg-white border-[1px] border-[#f5f5f5] px-4 md:py-4 py-2 rounded-[10px]">
            <h4 className="md:text-[16px] text-[13px] text-[#777777]">{t('enter-withdraw')}</h4>
            <div
                className="flex flex-row items-center  md:text-[18px] text-[13px] md:px-4 px-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                <input placeholder={`${t('typing')}`}
                       onChange={handleChange}
                       className="w-[88%] bg-white border-transparent focus:outline-0" type="number"/>
                <h2 className="md:text-[15px] text-[12px] cursor-pointer text-blue-500">{t('whole-balance')}</h2>
            </div>
            <div onClick={handleWithdrawRequest}
                 className="flex items-center justify-center md:text-[16px] text-[14px] cursor-pointer bg-blue-600 hover:bg-blue-700 text-white md:rounded-[7px] rounded-[3px] md:py-3 py-1">{t('request-withdrawal')}
            </div>
        </div>
    )
}