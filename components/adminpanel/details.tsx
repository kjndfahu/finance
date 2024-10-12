'use client'
import { useEffect, useState } from "react";
import { BankingDetails } from "@prisma/client"; // Assuming you're using Prisma
import { bankDetails } from "../../services/users";
import { Modal } from "../modal";

interface Props {
    className?: string;
}

export const Details: React.FC<Props> = ({ className }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [details, setDetails] = useState<BankingDetails[]>([]);
    const [selectedDetail, setSelectedDetail] = useState<BankingDetails | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await bankDetails();
                setDetails(data);
            } catch (err) {
                console.error("Ошибка загрузки данных", err);
            }
        };

        fetchDetails();
    }, []);

    const openModal = (detail: BankingDetails) => {
        setSelectedDetail(detail);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedDetail(null);
    };

    const handleUpdate = (updatedDetail: BankingDetails) => {
        setDetails((prevDetails) =>
            prevDetails.map((detail) =>
                detail.id === updatedDetail.id ? updatedDetail : detail
            )
        );
        closeModal();
    };

    return (
        <div className="flex justify-center w-full bg-[#f5f5f5] pt-[50px] max-w-[100%]">
            <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl text-black font-semibold mb-6">Реквизиты</h1>
                <table className="w-full text-left table-auto">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600">Название</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600">Адрес</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-600">Функции</th>
                    </tr>
                    </thead>
                    <tbody>
                    {details.map((item) => (
                        <tr key={item.id} className="border-t">
                            <td className="px-4 py-3 text-gray-700">{item.name}</td>
                            <td className="px-4 py-3 text-gray-700">{item.details}</td>
                            <td
                                onClick={() => openModal(item)}
                                className="px-4 py-3 text-blue-600 cursor-pointer hover:text-blue-800"
                            >
                                Изменить
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedDetail && (
                <Modal
                    isModalOpen={isModalOpen}
                    setModalOpen={setModalOpen}
                    detail={selectedDetail}
                    handleUpdate={handleUpdate}
                />
            )}
        </div>
    );
};
