import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Minus, Plus } from "lucide-react";

interface Props {
    className?: string;
    session: any;
    minSum: number | null;
    maxSum: number | null;
    setTotalTopupSum: (value: number) => void;
    setTotalWithdrawSum: (value: number) => void;
}

interface Operation {
    sum: number;
    createdAt: string;
    status: string;
    type: 'topup' | 'withdraw';
}

export const PaymentHistory: React.FC<Props> = ({ session, minSum, maxSum, setTotalTopupSum, setTotalWithdrawSum, className }) => {
    const t = useTranslations('History');
    const email = session.user.email;

    const [operations, setOperations] = useState<Operation[]>([]);

    useEffect(() => {
        const fetchOperations = async () => {
            try {
                const response = await fetch(`/api/operations?email=${email}`);
                const data = await response.json();

                const formattedOperations = data.map((item: any) => ({
                    sum: item.sum,
                    createdAt: item.createdAt,
                    status: item.status,
                    type: item.type === 'topup' ? 'topup' : 'withdraw'
                }));

                setOperations(formattedOperations);
            } catch (error) {
                console.error('Ошибка при получении операций:', error);
            }
        };

        fetchOperations();
    }, [email]);

    useEffect(() => {
        const topupSum = operations
            .filter(operation => operation.type === 'topup')
            .reduce((acc, operation) => acc + operation.sum, 0);

        const withdrawSum = operations
            .filter(operation => operation.type === 'withdraw')
            .reduce((acc, operation) => acc + operation.sum, 0);

        setTotalTopupSum(topupSum);
        setTotalWithdrawSum(withdrawSum);
    }, [operations, setTotalTopupSum, setTotalWithdrawSum]);

    const filteredOperations = operations.filter(operation => {
        const withinMin = minSum === null || operation.sum >= minSum;
        const withinMax = maxSum === null || operation.sum <= maxSum;
        return withinMin && withinMax;
    });

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
        <div className="flex flex-col gap-5 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px]">
            <h4 className="md:text-[18px] text-[15px] text-[#777777]">{t('transaction-history')}</h4>
            <div className="flex flex-col gap-3">
                {filteredOperations.map((operation, index) => (
                    <div key={index} className="flex flex-row items-center border-b-[1px] py-3 border-[#b0b0b0] justify-between">
                        <div className="flex flex-row gap-3">
                            <div className={`flex items-center justify-center bg-[#f5f5f5] md:w-[85px] md:h-[85px] w-[50px] h-[50px] rounded-full`}>
                                {operation.type === 'topup' ? (
                                    <Plus width={30} height={30} color="#54acff" />
                                ) : (
                                    <Minus width={30} height={30} />
                                )}
                            </div>
                            <div className="flex flex-col md:gap-1">
                                <h1 className="md:text-[19px] text-[14px]">
                                    {operation.type === 'topup' ? t('deposit-creation') : t('withdraw')}
                                </h1>
                                <h3 className={`md:text-[19px] text-[14px] text-[#b0b0b0] ${getStatusClass(operation.status)}`}>
                                    {getStatusText(operation.status)}
                                </h3>
                                <h3 className="md:text-[16px] text-[13px] text-[#b0b0b0]">{new Date(operation.createdAt).toLocaleString()}</h3>
                            </div>
                        </div>
                        <h2
                            className={`font-semibold md:text-[21px] text-[14px] ${operation.type === 'topup' ? 'text-green-500' : 'text-black'}`}
                        >
                            {operation.type === 'topup' ? `+$${operation.sum}` : `-$${operation.sum}`}
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
};
