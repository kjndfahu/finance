'use client'
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface Deposit {
    id: number;
    depositSum: string;
    earning: number;
    percent: string;
    withdrawSum: number;
    endDate: string;
    status: string;
}

interface Props {
    className?: string;
    session: any;
}

export const HistoryOfDeposits: React.FC<Props> = ({ className, session }) => {
    const t = useTranslations('AccountPersonal');
    const [deposits, setDeposits] = useState<Deposit[]>([]);
    const userLogin = session.user.name
    useEffect(() => {
        const fetchDeposits = async () => {
            try {
                const response = await fetch(`/api/depositsuser?login=${userLogin}`);
                if (!response.ok) {
                    throw new Error('Ошибка при получении депозитов');
                }
                const data = await response.json();
                setDeposits(data);
            } catch (error) {
                console.error('Ошибка загрузки депозитов:', error);
            }
        };

        fetchDeposits();
    }, [userLogin]);

    return (
        <div className={`overflow-x-auto bg-white md:p-4 p-1 rounded-lg ${className}`}>
            <h2 className="md:text-lg text-[15px] font-semibold mb-4">{t('open-deposits')}</h2>
            <table className="min-w-full table-auto">
                <thead>
                <tr className="text-left text-[#b0b0b0]">
                    <th className="md:p-2 p-1 md:text-[16px] text-[12px] font-medium">{t('deposit-amount')}</th>
                    <th className="md:p-2 p-1 md:text-[16px] text-[12px] font-medium">{t('interest-rate')}</th>
                    <th className="md:p-2 p-1 md:text-[16px] text-[12px] font-medium">{t('end-date')}</th>
                    <th className="md:p-2 p-1 md:text-[16px] text-[12px] font-medium">{t('status')}</th>
                    <th className="md:p-2 p-1 md:text-[16px] text-[12px] font-medium">{t('exit-amount')}</th>
                </tr>
                </thead>
                <tbody>
                {deposits.map((deposit) => (
                    <tr key={deposit.id} className="border-b">
                        <td className="p-2 md:text-[16px] text-[12px]"> {parseFloat(deposit.depositSum).toFixed(2)}$</td>
                        <td className="p-2 md:text-[16px] text-[12px] text-green-500">{deposit.percent}%</td>
                        <td className="p-2 md:text-[16px] text-[12px]">{new Date(deposit.endDate).toLocaleDateString()}</td>
                        <td className={`p-2 md:text-[16px] text-[12px] ${deposit.status === 'FINISHED' ? 'text-red-500' : ''}`}>
                            {deposit.status}
                        </td>
                        <td className="p-2 md:text-[16px] text-[12px] text-green-500">${deposit.withdrawSum.toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
