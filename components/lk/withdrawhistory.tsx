'use client';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface WithdrawOperation {
    id: number;
    type: string;
    sum: number;
    createdAt: string;
    status: string;
}

interface Props {
    className?: string;
    session: any;
}

export const WithdrawHistory: React.FC<Props> = ({ session, className }) => {
    const [operations, setOperations] = useState<WithdrawOperation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchWithdrawOperations = async () => {
            try {
                const response = await fetch(`/api/withdrawoperations?email=${session.user.email}`);
                if (!response.ok) {
                    throw new Error("Ошибка при получении операций");
                }
                const data = await response.json();
                setOperations(data);
            } catch (error) {
                toast.error('Ошибка загрузки данных');
                console.error('Ошибка при получении операций:', error);
            } finally {
                setLoading(false);
            }
        };

        if (session?.user?.email) {
            fetchWithdrawOperations();
        }
    }, [session?.user?.email]);

    if (loading) {
        return <p>Загрузка данных...</p>;
    }

    if (operations.length === 0) {
        return <p>Нет данных для отображения</p>;
    }

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
                return 'Отказано';
            case 'APPROVED':
                return 'Принято';
            case 'INPROCESSING':
                return 'Обрабатывается';
            default:
                return status;
        }
    };

    return (
        <div className={`overflow-x-auto bg-white md:p-4 p-1 rounded-lg ${className}`}>
            <table className="min-w-full table-auto">
                <thead>
                <tr className="text-left text-[#b0b0b0]">
                    <th className="md:p-2 p-1 md:text-[16px] text-[12px] font-medium">Сумма</th>
                    <th className="md:p-2 p-1 md:text-[16px] text-[12px] font-medium">Дата</th>
                    <th className="md:p-2 p-1 md:text-[16px] text-[12px] font-medium">Статус</th>
                </tr>
                </thead>
                <tbody>
                {operations.map((operation) => (
                    <tr key={operation.id} className="border-b text-black">
                        <td className="p-2 md:text-[16px] text-[12px]">${operation.sum}</td>
                        <td className="p-2 md:text-[16px] text-[12px]">
                            {new Date(operation.createdAt).toLocaleString()}
                        </td>
                        <td className={`p-2 md:text-[16px] text-[12px] ${getStatusClass(operation.status)}`}>
                            {getStatusText(operation.status)}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
