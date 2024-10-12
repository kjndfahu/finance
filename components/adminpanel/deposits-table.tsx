'use client'
import {useEffect, useState} from "react";
import {Deposits, User} from "@prisma/client";
import {depositstable, list} from "../../services/users";
import {format} from "date-fns";

interface Props{
    className?:string;
}

export const DepositsTable:React.FC<Props> = ({className})=>{
    const [clients, setClients] = useState<Deposits[]>([]);
    useEffect(() => {
        const fetchClients = async () => {
            try {
                console.log(depositstable())
                const data = await depositstable();
                setClients(data);
            } catch (err) {
                console.log("Ошибка загрузки данных", err);
            }
        };


        fetchClients();
    }, []);

    return (
        <div className="mt-[50px] min-h-screen bg-[#f5f5f5] text-black flex ">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
                <h2 className="text-2xl mb-4">Список всех депозитов</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-white text-[#b0b0b0]">
                        <th className="px-4 py-2 font-normal text-left">Логин</th>
                        <th className="px-4 py-2 font-normal text-left">Баланс</th>
                        <th className="px-4 py-2 font-normal text-left">Сумма депозита</th>
                        <th className="px-4 py-2 font-normal text-left">Процент</th>
                        <th className="px-4 py-2 font-normal text-left">Сумма вывода</th>
                        <th className="px-4 py-2 font-normal text-left">Дата окончания</th>
                        <th className="px-4 py-2 font-normal text-left">Статус депозита</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} className="border-b">
                            <td className="px-4 py-2">{client.login}</td>
                            <td className="px-4 py-2">${client.balance}</td>
                            <td className="px-4 py-2">${client.depositSum}</td>
                            <td className="px-4 py-2">{client.percent}%</td>
                            <td className="px-4 py-2">${client.withdrawSum}</td>
                            <td className="px-4 py-2">{format(new Date(client.endDate), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td className="px-4 py-2 text-green-500">{client.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}