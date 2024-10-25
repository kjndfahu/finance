'use client';
import { useCallback, useEffect, useState } from "react";
import { User } from "@prisma/client";
import { list } from "../../services/users";
import toast from "react-hot-toast";
import debounce from "debounce";
import { ModalReferrals } from "./modalreferrals";

interface WithdrawOperation {
    sum: number;
    status: string;
}

interface TopUpOperation {
    sum: number;
    status: string;
}

interface Props {
    className?: string;
    session: any;
}

export const AllClients: React.FC<Props> = ({ className, session }) => {
    const [clients, setClients] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredClients, setFilteredClients] = useState<User[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedClientLogin, setSelectedClientLogin] = useState<string | null>(null);
    const [withdrawSums, setWithdrawSums] = useState<{ [email: string]: number }>({});
    const [topUpSums, setTopUpSums] = useState<{ [email: string]: number }>({});

    const debouncedSetSearchTerm = useCallback(
        debounce((newValue: string) => setSearchTerm(newValue), 500),
        []
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetSearchTerm(event.target.value);
    };

    const fetchWithdrawAmount = async (email: string) => {
        try {
            const res = await fetch(`/api/withdrawoperations?email=${email}`);
            const operations: WithdrawOperation[] = await res.json();

            // Суммируем все операции со статусом APPROVED
            const approvedSum = operations
                .filter(operation => operation.status === 'APPROVED')
                .reduce((acc, curr) => acc + curr.sum, 0);

            setWithdrawSums(prev => ({ ...prev, [email]: approvedSum }));
        } catch (err) {
            console.error('Ошибка получения суммы вывода:', err);
        }
    };

    const fetchTopUpAmount = async (email: string) => {
        try {
            const res = await fetch(`/api/topupoperations?email=${email}`);
            const operations: TopUpOperation[] = await res.json();

            // Суммируем все операции со статусом APPROVED
            const approvedSum = operations
                .filter(operation => operation.status === 'APPROVED')
                .reduce((acc, curr) => acc + curr.sum, 0);

            setTopUpSums(prev => ({ ...prev, [email]: approvedSum }));
        } catch (err) {
            console.error('Ошибка получения суммы пополнений:', err);
        }
    };

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await list();
                setClients(data);
                setFilteredClients(data);

                // Для каждого клиента делаем запрос на получение выведенной суммы и суммы пополнений
                data.forEach(client => {
                    fetchWithdrawAmount(client.email);
                    fetchTopUpAmount(client.email);
                });
            } catch (err) {
                console.log("Ошибка загрузки данных", err);
            }
        };

        fetchClients();
    }, []);

    useEffect(() => {
        const filtered = clients.filter(client =>
            client.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClients(filtered);
    }, [searchTerm, clients]);

    const handleDeleteUser = async (id: number) => {
        const confirmDelete = confirm("Вы уверены, что хотите удалить этого клиента?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/users/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setClients((prevClients) => prevClients.filter(client => client.id !== id));
                setFilteredClients((prevClients) => prevClients.filter(client => client.id !== id));
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

    return (
        <div className="md:mt-[50px] bg-[#f5f5f5] text-black flex flex-col gap-[50px] ">
            <div className="bg-white shadow-lg rounded-lg md:p-6 p-2 w-full overflow-x-auto">
                <h2 className="md:text-2xl text-[17px] mb-4">Список всех клиентов</h2>
                <div className="flex flex-row items-center text-[18px] md:px-4 px-2 md:py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                    <input
                        onChange={handleChange}
                        placeholder="Начните вводить логин или email..."
                        className="md:text-[18px] text-[14px] w-[88%] bg-white border-transparent focus:outline-0"
                        type="text" />
                </div>
                <table className="w-full table-auto border-collapse">
                    <thead>
                    <tr className="bg-white text-[#b0b0b0]">
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Логин</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Баланс</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Пополнено</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Выведено</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Имя</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Телефон</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Telegram</th>
                        <th className="md:px-4 px-1 py-2 md:text-[16px] text-[13px] font-normal text-left">Функция</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredClients.map((client) => (
                        <tr key={client.id} className="border-b">
                            <td onClick={() => {
                                setSelectedClientLogin(client.login);
                                setModalOpen(true);
                            }} className="md:px-4 cursor-pointer px-1 py-2 md:text-[16px] text-[13px]">{client.login}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">${client.balance.toFixed(2)}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">
                                ${topUpSums[client.email] ?? 0} {/* Суммированное значение пополнений */}
                            </td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">
                                ${withdrawSums[client.email] ?? 0} {/* Суммированное значение выводов */}
                            </td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{client.name}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{client.phoneNumber}</td>
                            <td className="md:px-4 px-1 py-2 md:text-[16px] text-[13px]">{client.telegramId}</td>
                            <td onClick={() => handleDeleteUser(client.id)}
                                className="md:px-4 px-2 py-2 md:text-[16px] text-[13px] cursor-pointer text-red-500">Удалить клиента
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {isModalOpen && (
                    <ModalReferrals
                        setModalOpen={setModalOpen}
                        isModalOpen={isModalOpen}
                        selectedClientLogin={selectedClientLogin}
                    />
                )}
            </div>
        </div>
    );
};
