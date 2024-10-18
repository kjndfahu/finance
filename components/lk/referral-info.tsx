'use client'
import React, { useEffect, useState } from 'react';
import {useTranslations} from "next-intl";

interface Props {
    className?: string;
    session: any;
}

export const ReferralsInfo: React.FC<Props> = ({ className, session }) => {
    const [referralData, setReferralData] = useState({ totalReferrals: 0, totalProfit: 0, totalAmount: 0 });
    const t = useTranslations("ReferralsTable")
    useEffect(() => {
        const fetchReferralData = async () => {
            try {
                const response = await fetch(`/api/getreferrals?email=${session.user.email}`);
                const data = await response.json();
                setReferralData(data);
            } catch (error) {
                console.error('Error fetching referral data:', error);
            }
        };

        fetchReferralData();
    }, [session.user.email]);

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center">
                <div className="flex flex-col items-center w-1/3">
                    <span className="md:text-[16px] text-center text-[12px] text-gray-500">{t('you-invited')}</span>
                    <span className="md:text-2xl text-[17px] text-black font-bold">{referralData.totalReferrals}</span>
                </div>

                <div className="border-r border-gray-300 h-12" />

                <div className="flex flex-col items-center w-1/3">
                    <span className="md:text-[16px] text-[12px] text-center text-gray-500 ">{t('accrued-profit')}</span>
                    <span className="md:text-2xl text-[17px] text-black font-bold">${referralData.totalAmount.toFixed(2)}</span>
                </div>

                <div className="border-r border-gray-300 h-12" />

                <div className="flex flex-col items-center w-1/3">
                    <span className="md:text-[16px] text-[12px] text-center text-gray-500">{t('total-deposits')}</span>
                    <span className="md:text-2xl text-[17px] text-black font-bold">${referralData.totalProfit.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};
