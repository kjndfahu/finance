'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Minus } from 'lucide-react';

interface WithdrawOperation {
    id: number;
    sum: number;
    status:string;
    createdAt: string;
}

interface Props {
    className?: string;
    session: any;
    minSum: number | null;
    maxSum: number | null;
    setTotalTopupSum: (value: number) => void;
    setTotalWithdrawSum: (value: number) => void;
}

export const WithdrawHistory: React.FC<Props> = ({ session, minSum, maxSum, className }) => {
    const t = useTranslations('History');
    const [operations, setOperations] = useState<WithdrawOperation[]>([]);
    const [sortedOperations, setSortedOperations] = useState<WithdrawOperation[]>([]);
    const email = session.user.email;

    useEffect(() => {
        const fetchTopUpHistory = async () => {
            try {
                const response = await fetch(`/api/withdrawoperations?email=${email}`);

                if (!response.ok) {
                    throw new Error('Ошибка при получении истории пополнений');
                }

                const data = await response.json();
                const formattedOperations = data.map((item: any) => ({
                    sum: item.sum,
                    createdAt: item.createdAt,
                    status: item.status,
                }))

                setOperations(formattedOperations);
            } catch (error) {
                console.error('Ошибка загрузки истории пополнений:', error);
            }
        };

        fetchTopUpHistory();
    }, [email]);

    useEffect(() => {
        const filteredOperations = operations.filter(operation => {
            const sumValid = (!minSum || operation.sum >= minSum) && (!maxSum || operation.sum <= maxSum);
            return sumValid;
        });

        setSortedOperations(filteredOperations);
    }, [operations, minSum, maxSum]);

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'REJECTED':
                return 'text-red-500';
            case 'APPROVED':
                return 'text-green-500';
            case 'IN PROCESSING':
                return 'text-black';
            default:
                return '';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'REJECTED':
                return `${t('rejected')}`;
            case 'APPROVED':
                return `${t('approved')}`;
            case 'INPROCESSING':
                return `${t('processing')}`;
            default:
                return status;
        }
    };


    return (
        <div className={`flex flex-col gap-5 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px] ${className}`}>
            <h4 className="md:text-[18px] text-[15px] text-[#777777]">{t('transaction-history')}</h4>
            <div className="flex flex-col gap-3">
                {sortedOperations.map((withdraw) => (
                    <div key={withdraw.id} className="flex flex-row items-center border-b-[1px] py-3 border-[#b0b0b0] justify-between">
                        <div className="flex flex-row gap-3">
                            <div className="flex items-center justify-center bg-[#f5f5f5] md:w-[85px] md:h-[85px] w-[50px] h-[50px] rounded-full">
                                <Minus width={30} height={30} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="md:text-[19px] text-[14px]">Withdraw</h1>
                                <h3 className="md:text-[16px] text-[13px] text-[#b0b0b0]">{new Date(withdraw.createdAt).toLocaleString()}</h3>
                                <h3 className={`md:text-[19px] text-[14px] text-[#b0b0b0] ${getStatusClass(withdraw.status)}`}>
                                    {getStatusText(withdraw.status)}
                                </h3>
                            </div>
                        </div>
                        <h2 className="font-semibold md:text-[21px] text-[14px]">-${withdraw.sum.toFixed(2)}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};
