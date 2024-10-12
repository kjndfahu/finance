'use client'
import {useEffect, useState} from "react";
import {User} from "@prisma/client";
import {list} from "../../services/users";
import toast from "react-hot-toast";

interface Props{
    className?:string;
}

export const AllClients:React.FC<Props> = ({ className})=>{
    const [clients, setClients] = useState<User[]>([]);
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await list();
                setClients(data);
            } catch (err) {
                console.log("Ошибка загрузки данных", err);
            }
        };


        fetchClients();
    }, []);

    const handleDeleteUser = async (id: number) => {
        const confirmDelete = confirm("Вы уверены, что хотите удалить этого клиента?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setClients((prevClients) => prevClients.filter(client => client.id !== id));
                toast.success("Клиент успешно удалён");
            } else {
                const error = await res.json();
                toast.error(`Ошибка удаления: ${error.message}`);
            }
        } catch (err) {
            console.log("Ошибка при удалении клиента", err);
            toast.error("Ошибка удаления клиента");
        }
    };

    const handleCopyPassword = (password: string) => {
        navigator.clipboard.writeText(password).then(() => {
            toast.success("Пароль скопирован в буфер обмена!");
        }).catch(err => {
            toast.error("Ошибка копирования пароля");
            console.error('Ошибка копирования:', err);
        });
    };

    return (
        <div className="mt-[50px] bg-[#f5f5f5] text-black flex flex-col gap-[50px]">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full ">
                <h2 className="text-2xl mb-4">Список всех клиентов</h2>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-white text-[#b0b0b0]">
                        <th className="px-4 py-2 font-normal text-left">Логин</th>
                        <th className="px-4 py-2 font-normal text-left">Пароль</th>
                        <th className="px-4 py-2 font-normal text-left">Баланс</th>
                        <th className="px-4 py-2 font-normal text-left">Пополнено</th>
                        <th className="px-4 py-2 font-normal text-left">Выведено</th>
                        <th className="px-4 py-2 font-normal text-left">Имя</th>
                        <th className="px-4 py-2 font-normal text-left">Телефон</th>
                        <th className="px-4 py-2 font-normal text-left">Telegram</th>
                        <th className="px-4 py-2 font-normal text-left">Функция</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map((client) => (
                        <tr key={client.id} className="border-b">
                            <td className="px-4 py-2">{client.login}</td>
                            <td className="px-4 py-2 cursor-pointer"
                                onClick={() => handleCopyPassword(client.password)}>
                                {client.password.length > 7 ? (
                                    <span>{client.password.substring(0, 7)}...</span>
                                ) : (
                                    <span>{client.password}</span>
                                )}
                            </td>
                            <td className="px-4 py-2">${client.balance}</td>
                            <td className="px-4 py-2">200</td>
                            <td className="px-4 py-2">200</td>
                            <td className="px-4 py-2">{client.name}</td>
                            <td className="px-4 py-2">{client.phoneNumber}</td>
                            <td className="px-4 py-2">{client.telegramId}</td>
                            <td onClick={() => handleDeleteUser(client.id)} className="px-4 py-2 cursor-pointer text-red-500">Удалить клиента</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}