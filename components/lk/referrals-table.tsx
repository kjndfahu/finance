// components/lk/referrals-table.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

interface Props {
    className?: string;
    session: any; // Здесь вы можете уточнить тип данных для сессии
}

export const ReferralsTable: React.FC<Props> = ({ className, session }) => {
    const [referrals, setReferrals] = useState<any[]>([]);
    const t = useTranslations("ReferralsTable");
    const router = useRouter();

    useEffect(() => {
        const fetchReferralData = async () => {
            try {
                // Получаем email из session
                const email = session.user.email;
                // Формируем URL для запроса к динамическому роуту
                const response = await fetch(`/api/getreferralstable/${email}`);

                if (!response.ok) {
                    throw new Error('Ошибка при получении данных');
                }

                const data = await response.json();
                setReferrals(data);
            } catch (error) {
                console.error('Error fetching referral data:', error);
            }
        };

        fetchReferralData();
    }, [session.user.email]);

    // Функция для преобразования line в строку с процентами
    const getLineText = (line: string) => {
        switch (line) {
            case 'Линия 1':
                return `${t('firstline')}`;
            case 'Линия 2':
                return `${t('secondline')}`;
            case 'Линия 3':
                return `${t('thirdline')}`;
            default:
                return line; // Возвращаем оригинальный текст, если line не соответствует 1, 2 или 3
        }
    };

    return (
        <div className={`bg-white p-4 rounded-xl shadow-md ${className}`}>
            <h2 className="text-xl font-bold text-black mb-4">{t('yourreferrals')}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                    <tr>
                        <th className="py-2 text-gray-400 font-medium text-left w-1/3">{t('login')}</th>
                        <th className="py-2 text-gray-400 font-medium text-center w-1/3">{t('line')}</th>
                        <th className="py-2 text-gray-400 font-medium text-right w-1/3">{t('amount-of-deposits')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {referrals.map((referral, index) => (
                        <tr key={index} className="border-t border-gray-200">
                            <td className="py-3 text-gray-800 text-left w-1/3">{referral.login}</td>
                            <td className="py-3 text-green-500 text-center w-1/3">{getLineText(referral.line)}</td>
                            <td className="py-3 text-gray-800 text-right w-1/3">{referral.depositSum}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
