'use client';
import { useEffect, useState } from "react";
import { topuptable } from "../../services/users";
import { TopUpRequest } from "@prisma/client";
import { format } from "date-fns";
import toast from "react-hot-toast";

interface Props {
    className?: string;
}

export const TopUpTable: React.FC<Props> = ({ className }) => {
    const [requests, setRequests] = useState<TopUpRequest[]>([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await topuptable();
                setRequests(data);
            } catch (err) {
                console.log("Ошибка загрузки данных", err);
            }
        };
        fetchRequests();
    }, []);

    const handleApprove = async (requestId: number, email: string, sum: number) => {
        try {
            const response = await fetch('/api/topuprequest/approve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sum, email, requestId }), // Добавлено requestId
            });

            const result = await response.json();

            if (response.ok) {
                // Удаляем заявку из состояния после успешного одобрения
                setRequests(prev => prev.filter(request => request.id !== requestId));
                toast.success('Успешно оформлено пополнение');
            } else {
                console.error('Ошибка одобрения заявки:', result.error);
                toast.error(result.error || 'Ошибка одобрения заявки');
            }
        } catch (error) {
            console.error('Ошибка одобрения заявки:', error);
        }
    };

    const handleReject = async (requestId: number, email: string, sum: number) => {
        // try {
        //     const response = await fetch('/api/topuprequest/decline', {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ requestId }),
        //     });
        //
        //     const result = await response.json();
        //
        //     if (response.ok) {
        //         setRequests(prev => prev.filter(request => request.id !== requestId));
        //         toast.success('Заявка отклонена и удалена');
        //     } else {
        //         console.error('Ошибка при отклонении заявки:', result.message);
        //         toast.error('Ошибка при отклонении заявки: ' + result.message);
        //     }
        // } catch (error) {
        //     console.error('Ошибка при выполнении запроса на отклонение заявки:', error);
        //     toast.error('Ошибка сервера при отклонении заявки');
        // }
        try {
            const response = await fetch('/api/topuprequest/decline', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId, email, sum }),
            });

            const result = await response.json();

            if (response.ok) {
                setRequests(prev => prev.filter(req => req.id !== requestId));
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

    return (
        <div className={`md:mt-[50px] bg-[#f5f5f5] text-black flex ${className}`}>
            <div className="bg-white shadow-lg rounded-lg md:p-6 p-2 w-full overflow-x-auto">
                <h2 className="md:text-2xl text-[17px] mb-4">Заявки пополнения</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-white text-[#b0b0b0]">
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Логин</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Способ</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Дата заявки</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Сумма заявки</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Функции</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((request) => (
                        <tr key={request.id} className="border-b">
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{request.email}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{request.type}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{format(new Date(request.createdAt), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">${request.sum}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] flex flex-col items-start">
                                <h2
                                    onClick={() => handleApprove(request.id, request.email, request.sum)}
                                    className="text-green-500 cursor-pointer py-1 rounded"
                                >
                                    Одобрить
                                </h2>
                                <h2
                                    onClick={() => handleReject(request.id, request.email, request.sum)}
                                    className="text-red-500 cursor-pointer py-1 rounded"
                                >
                                    Отклонить
                                </h2>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
