'use client';
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { WithdrawRequest } from "@prisma/client";
import { withdrawtable } from "../../services/users";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface Props {
    className?: string;
}

export const WithdrawTable: React.FC<Props> = ({ className }) => {
    const [requests, setRequest] = useState<WithdrawRequest[]>([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await withdrawtable();
                setRequest(data);
            } catch (err) {
                console.log("Ошибка загрузки данных", err);
            }
        };

        fetchClients();
    }, []);

    const handleReject = async (requestId: number, email: string, amount: number) => {
        try {
            const response = await fetch('/api/withdrawrequest/decline', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId, email, amount }),
            });

            const result = await response.json();

            if (response.ok) {
                setRequest(prev => prev.filter(req => req.id !== requestId));
                toast.success('Заявка отклонена и удалена');
            } else {
                toast.error(`Ошибка при отклонении заявки: ${result.message || 'Неизвестная ошибка'}`);
                console.error('Ошибка при отклонении заявки', result.message);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса на отклонение заявки:', error);
            toast.error('Ошибка при выполнении запроса');
        }
    };

    const approveRequest = async (requestId: number, email: string, amount: number) => {
        try {
            const response = await fetch('/api/withdrawrequest/approve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    requestId,
                    email,
                    amount,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                toast.success('Заявка на вывод одобрена');
                console.log('Заявка одобрена:', result);
                setRequest(prev => prev.filter((req) => req.id !== requestId));
            } else {
                toast.error('Ошибка одобрения заявки');
                console.error('Ошибка одобрения заявки:', result.message);
            }
        } catch (err) {
            console.error('Ошибка при отправке запроса:', err);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success("Успех! Реквизиты скопированы!");
        }).catch((err) => {
            console.error('Не удалось скопировать: ', err);
        });
    };

    return (
        <div className="md:mt-[50px] bg-[#f5f5f5] text-black flex">
            <div className="bg-white shadow-lg rounded-lg md:p-6 p-2 w-full overflow-x-auto">
                <h2 className="md:text-2xl text-[17px] mb-4">Заявки на вывод</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-white text-[#b0b0b0]">
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Логин</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Способ</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Дата заявки</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Сумма</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Реквизиты</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((request) => (
                        <tr key={request.id} className="border-b">
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{request.email}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{request.method}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{format(new Date(request.createdAt), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">${request.amount}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">
                                <div onClick={() => handleCopy(request.paymentDetails)} className="flex items-center gap-2">
                                    <h3>{request.paymentDetails}</h3>
                                    <Copy width={15} height={15} className="cursor-pointer" />
                                </div>
                            </td>
                            <td className="px-4 py-2 flex flex-col items-start">
                                <button
                                    className="text-green-500 py-1 rounded"
                                    onClick={() => approveRequest(request.id, request.email, request.amount)}
                                >
                                    Одобрить
                                </button>
                                <button
                                    onClick={() => handleReject(request.id, request.email, request.amount)}
                                    className="text-red-500 py-1 rounded"
                                >
                                    Отклонить
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
