'use client'
import {useEffect, useState} from "react";
import {Deposits, User} from "@prisma/client";
import {format} from "date-fns";
import {depositstable} from "../../services/admin";

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
        <div className="md:mt-[50px] min-h-screen bg-[#f5f5f5] text-black flex w-full">
            <div className="bg-white shadow-lg rounded-lg md:p-6 p-2 w-full overflow-x-auto">
                <h2 className="md:text-2xl text-[17px] mb-4">Список всех депозитов</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-white text-[#b0b0b0]">
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Логин</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Баланс</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Сумма депозита</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Процент</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Сумма вывода</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Дата окончания</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Статус депозита</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} className="border-b">
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{client.login}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">${client.balance}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">${client.depositSum}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{client.percent}%</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">${client.withdrawSum}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{format(new Date(client.endDate), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] text-green-500">{client.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}