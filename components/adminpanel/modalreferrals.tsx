import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Props {
    className?: string;
    isModalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    selectedClientLogin: string | null; // Пропс для логина клиента
}

interface Referral {
    login: string;
    line: string;
    depositSum: string;
}

interface ApiResponse {
    email: string;
    password: string; // Добавляем password
    referrals: Referral[];
}

export const ModalReferrals: React.FC<Props> = ({ isModalOpen, setModalOpen, selectedClientLogin }) => {
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userPassword, setUserPassword] = useState<string | null>(null); // Добавляем состояние для пароля
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
            fetchReferrals();
        } else {
            document.body.style.overflow = "";
        }
    }, [isModalOpen]);

    const fetchReferrals = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`/api/getmodalreferrals/${selectedClientLogin}`);
            if (!response.ok) {
                throw new Error("Не удалось загрузить данные: " + response.statusText);
            }
            const data: ApiResponse = await response.json();
            setUserEmail(data.email);
            setUserPassword(data.password); // Сохраняем пароль
            setReferrals(data.referrals);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            onClick={() => setModalOpen(false)}
            className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[800px] gap-5 px-7 bg-white text-[#b0b0b0] rounded-[20px] flex flex-col items-center justify-center"
            >
                <div className="flex flex-row w-full mt-[10px] justify-between">
                    <div className="w-[10px]"></div>
                    <div className="flex flex-row bg-[#b0b0b0] cursor-pointer rounded-full">
                        <X onClick={() => setModalOpen(false)} width={18} height={18} color="#ffffff" />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-[24px] leading-6 text-black">Рефералы</h1>
                </div>
                <div className="w-full bg-white p-4 rounded-xl">
                    <h2 className="text-xl font-bold text-black mb-4">
                        Рефералы пользователя {selectedClientLogin} (email: {userEmail}, password: {userPassword})
                    </h2>
                    {loading ? (
                        <p>Загрузка...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead>
                                <tr>
                                    <th className="py-2 text-gray-400 font-medium text-left w-1/3">Логин</th>
                                    <th className="py-2 text-gray-400 font-medium text-center w-1/3">Линия</th>
                                    <th className="py-2 text-gray-400 font-medium text-right w-1/3">Сумма депозитов</th>
                                </tr>
                                </thead>
                                <tbody>
                                {referrals.map((referral, index) => (
                                    <tr key={index} className="border-t border-gray-200">
                                        <td className="py-3 text-gray-800 text-left w-1/3">{referral.login}</td>
                                        <td className="py-3 text-green-500 text-center w-1/3">{referral.line}</td>
                                        <td className="py-3 text-gray-800 text-right w-1/3">{referral.depositSum}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
