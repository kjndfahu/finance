'use client'
import { useEffect, useState } from "react";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import axios from "axios";
import toast from "react-hot-toast";

interface Props {
    className?: string;
    session: any; // Объект сессии передается в компонент
}

export const ReferralLink: React.FC<Props> = ({ session, className }) => {
    const [referralCode, setReferralCode] = useState<string>("");
    const t = useTranslations('Refferal');
    const myUrl = new URL('http://localhost:3000/registration?referralCode=');
    const url = myUrl.toString();

    useEffect(() => {
        const fetchReferralCode = async () => {
            try {
                const response = await axios.get('/api/referral', {
                    params: {
                        name: session?.user?.name
                    }
                });

                // Устанавливаем реферальный код в состояние
                setReferralCode(response.data.referralCode);
            } catch (error) {
                console.error("Error fetching referral code:", error);
            }
        };

        if (session?.user?.name) {
            fetchReferralCode();
        }
    }, [session?.user?.name]);

    const handleCopy = () => {
        const textToCopy = `${url}${referralCode}`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            toast.success("Success! Referral link copied!"); // Показать тост
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className={`flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px] ${className}`}>
            <h2 className="text-[18px] text-[#777777] mt-3">{t('personal-reference:')}</h2>
            <div className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] p-3 text-[#777777] gap-3">
                <h4 className="text-blue-500 font-semibold text-[18px] cursor-pointer" onClick={handleCopy}>
                    {url}{referralCode}
                </h4>
                <Copy width={19} onClick={handleCopy} className="cursor-pointer" />
            </div>
        </div>
    );
};
