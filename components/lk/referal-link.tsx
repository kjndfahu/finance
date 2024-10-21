'use client';
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
    const url = window.location.href;
    const newUrl = url.replace(/(\/en\/).*/, '$1'); // Изменяем URL на корректный
    const emailToPost = session.user.email; // Извлекаем email из сессии

    useEffect(() => {
        const fetchReferralCode = async () => {
            if (emailToPost) {
                try {
                    // Отправляем POST-запрос с email
                    const response = await axios.post(`/api/referral`, {
                        email: emailToPost // Передаем email в теле запроса
                    });

                    setReferralCode(response.data.referralCode);
                } catch (error) {
                    console.error("Error fetching referral code:", error);
                }
            }
        };

        fetchReferralCode();
    }, [emailToPost]);

    const handleCopy = () => {
        const textToCopy = `${newUrl}registration?referralCode=${referralCode}`;

        navigator.clipboard.writeText(textToCopy).then(() => {
            toast.success("Success! Referral link copied!"); // Показать тост
        }).catch((err) => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className={`flex flex-col gap-2 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px] ${className}`}>
            <h2 className="text-[18px] text-[#777777] mt-3">{t('personal-reference:')}</h2>
            <div className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] p-3 text-[#777777] md:gap-3">
                <h4 className="text-blue-500 font-semibold md:text-[18px] smbvp:text-[13px] text-[11px] cursor-pointer" onClick={handleCopy}>
                    {newUrl}registration?referralCode={referralCode}
                </h4>
                <Copy width={19} onClick={handleCopy} className="cursor-pointer" />
            </div>
        </div>
    );
};
