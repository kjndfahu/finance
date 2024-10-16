import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

interface TopUpOperation {
    id: number;
    sum: number;
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

export const TopUpHistory: React.FC<Props> = ({ session, minSum, maxSum, className }) => {
    const t = useTranslations('History');
    const [operations, setOperations] = useState<TopUpOperation[]>([]);
    const [sortedOperations, setSortedOperations] = useState<TopUpOperation[]>([]);
    const email = session.user.email;

    useEffect(() => {
        const fetchTopUpHistory = async () => {
            try {
                const response = await fetch(`/api/topupoperations?email=${email}`);

                if (!response.ok) {
                    throw new Error('Ошибка при получении истории пополнений');
                }

                const data = await response.json();
                setOperations(data);
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


    return (
        <div className={`flex flex-col gap-5 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px] ${className}`}>
            <h4 className="md:text-[18px] text-[15px] text-[#777777]">{t('transaction-history')}</h4>


            <div className="flex flex-col gap-3 mt-4">
                {sortedOperations.map((operation) => (
                    <div key={operation.id} className="flex flex-row items-center border-b-[1px] py-3 border-[#b0b0b0] justify-between">
                        <div className="flex flex-row gap-3">
                            <div className="flex items-center justify-center bg-[#f5f5f5] md:w-[85px] md:h-[85px] w-[50px] h-[50px] rounded-full">
                                <Plus width={30} height={30} color="#54acff" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="md:text-[19px] text-[14px]">{t('deposit')}</h1>
                                <h3 className="md:text-[16px] text-[13px] text-[#b0b0b0]">{new Date(operation.createdAt).toLocaleString()}</h3>
                            </div>
                        </div>
                        <h2 className="font-semibold md:text-[21px] text-[14px] text-green-500">+${operation.sum.toFixed(2)}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};
