'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Minus } from 'lucide-react';
import toast from 'react-hot-toast';

interface WithdrawOperation {
    id: number;
    sum: number;
    createdAt: string;
}

interface Props {
    className?: string;
    session: any;
}

export const WithdrawHistory: React.FC<Props> = ({ session, className }) => {
    const t = useTranslations('History');
    const email = session?.user?.email;

    const [withdraws, setWithdraws] = useState<WithdrawOperation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWithdrawHistory = async () => {
            try {
                const response = await fetch(`/api/withdrawoperations?email=${email}`);
                if (!response.ok) {
                    throw new Error('Ошибка загрузки данных');
                }
                const data = await response.json();
                setWithdraws(data);
            } catch (error) {
                console.error('Ошибка получения истории выводов:', error);
                toast.error('Не удалось загрузить историю выводов');
            } finally {
                setLoading(false);
            }
        };

        if (email) {
            fetchWithdrawHistory();
        }
    }, [email]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (!withdraws.length) {
        return <div>Нет данных о выводах средств</div>;
    }

    return (
        <div className={`flex flex-col gap-5 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px] ${className}`}>
            <h4 className="md:text-[18px] text-[15px] text-[#777777]">{t('transaction-history')}</h4>
            <div className="flex flex-col gap-3">
                {withdraws.map((withdraw) => (
                    <div key={withdraw.id} className="flex flex-row items-center border-b-[1px] py-3 border-[#b0b0b0] justify-between">
                        <div className="flex flex-row gap-3">
                            <div className="flex items-center justify-center bg-[#f5f5f5] md:w-[85px] md:h-[85px] w-[50px] h-[50px] rounded-full">
                                <Minus width={30} height={30} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="md:text-[19px] text-[14px]">Withdraw</h1>
                                <h3 className="md:text-[16px] text-[13px] text-[#b0b0b0]">{new Date(withdraw.createdAt).toLocaleString()}</h3>
                            </div>
                        </div>
                        <h2 className="font-semibold md:text-[21px] text-[14px]">-${withdraw.sum.toFixed(2)}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};
