'use client';
import { useEffect, useState } from "react";
import { topuptable } from "../../services/users";
import { TopUpRequest } from "@prisma/client";
import { format } from "date-fns";

interface Props {
    className?: string;
}

export const TopUpTable: React.FC<Props> = ({ className }) => {
    const [requests, setRequest] = useState<TopUpRequest[]>([]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await topuptable();
                setRequest(data);
            } catch (err) {
                console.log("Ошибка загрузки данных", err);
            }
        };
        fetchClients();
    }, []);

    const handleApprove = async (requestId: number, userId: number, sum: number) => {
        try {
            const response = await fetch('/api/topuprequest/approve', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ sum, userId }),
            });

            if (response.ok) {
                setRequest(prev => prev.filter(request => request.id !== requestId));
            } else {
                console.error('Ошибка одобрения заявки');
            }
        } catch (error) {
            console.error('Ошибка одобрения заявки:', error);
        }
    };

    const handleReject = async (requestId: number) => {
        try {
            const response = await fetch(`/api/topuprequest/decline`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestId }),
            });

            if (response.ok) {
                setRequest(prev => prev.filter(request => request.id !== requestId));
            } else {
                console.error('Ошибка отклонения заявки');
            }
        } catch (error) {
            console.error('Ошибка отклонения заявки:', error);
        }
    };

    return (
        <div className="mt-[50px] bg-[#f5f5f5] text-black flex ">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
                <h2 className="text-2xl mb-4">Заявки пополнения</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-white text-[#b0b0b0]">
                        <th className="px-4 py-2 font-normal text-left">Логин</th>
                        <th className="px-4 py-2 font-normal text-left">Способ</th>
                        <th className="px-4 py-2 font-normal text-left">Дата заявки</th>
                        <th className="px-4 py-2 font-normal text-left">Сумма заявки</th>
                        <th className="px-4 py-2 font-normal text-left">Функции</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((request) => (
                        <tr key={request.id} className="border-b">
                            <td className="px-4 py-2">{request.email}</td>
                            <td className="px-4 py-2">{request.type}</td>
                            <td className="px-4 py-2">{format(new Date(request.createdAt), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td className="px-4 py-2">${request.sum}</td>
                            <td className="px-4 py-2 flex flex-col items-start">
                                <h2 onClick={() => handleApprove(request.id, request.id, request.sum)} className="text-green-500 py-1 rounded">
                                    Одобрить
                                </h2>
                                <h2 onClick={() => handleReject(request.id)} className="text-red-500 py-1 rounded">
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