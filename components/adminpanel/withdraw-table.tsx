'use client'
import {Copy} from "lucide-react";
import {useEffect, useState} from "react";
import {User} from "@prisma/client";
import {list, withdrawtable} from "../../services/users";
import { format } from "date-fns";

interface Props{
    className?:string;
}

export const WithdrawTable:React.FC<Props> = ({className})=>{
    const [requests, setRequest] = useState<WithdrawRequest[]>([]);
    useEffect(() => {
        const fetchClients = async () => {
            try {

                const data = await withdrawtable();
                setRequest(data);
                console.log(data, '111')
            } catch (err) {
                console.log("Ошибка загрузки данных", err);
            }
        };


        fetchClients();
    }, []);

    return (
        <div className="mt-[50px] bg-[#f5f5f5] text-black flex ">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
                <h2 className="text-2xl mb-4">Заявки вывода</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-white text-[#b0b0b0]">
                        <th className="px-4 py-2 font-normal text-left">Логин</th>
                        <th className="px-4 py-2 font-normal text-left">Способ</th>
                        <th className="px-4 py-2 font-normal text-left">Дата заявки</th>
                        <th className="px-4 py-2 font-normal text-left">Сумма заявки</th>
                        <th className="px-4 py-2 font-normal text-left">Реквизиты</th>
                        <th className="px-4 py-2 font-normal text-left">Функции</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((request) => (
                        <tr key={request.login} className="border-b">
                            <td className="px-4 py-2">{request.login}</td>
                            <td className="px-4 py-2">{request.method}</td>
                            <td className="px-4 py-2">{format(new Date(request.createdAt), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td className="px-4 py-2">${request.amount}</td>
                            <td className=" px-4 py-2">
                                <div className="flex items-center gap-2">
                                    <h3 >{request.paymentDetails}</h3>
                                    <Copy width={15} height={15}/>
                                </div>
                            </td>
                            <td className="px-4 py-2 flex flex-col items-start">
                                <h2 className="text-green-500 py-1 rounded">Одобрить</h2>
                                <h2 className=" text-red-500 py-1 rounded">Отклонить</h2>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}