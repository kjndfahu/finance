import { useCallback, useState, useEffect } from "react";
import debounce from "debounce";
import { X } from "lucide-react";
import axios from "axios"; // Импортируем axios

interface Props {
    className?: string;
    isModalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;
    detail: { name: string; details: string; id: number }; // Ваш тип BankingDetails
    handleUpdate: (updatedDetail: { id: number; name: string; details: string }) => void;
}

export const Modal: React.FC<Props> = ({
                                           isModalOpen,
                                           setModalOpen,
                                           detail,
                                           handleUpdate,
                                       }) => {
    const [value, setValue] = useState(detail.details);

    const debouncedSetValue = useCallback(
        debounce((newValue: string) => setValue(newValue), 100),
        []
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSetValue(event.target.value);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isModalOpen]);

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`/api/bankcard/${detail.id}`, {
                name: detail.name,
                details: value,
            });
            handleUpdate(response.data); // Обновляем состояние в родительском компоненте
            setModalOpen(false); // Закрываем модальное окно
        } catch (error) {
            console.error('Ошибка при обновлении:', error);

        }
    };

    return (
        <div
            onClick={() => setModalOpen(false)}
            className="flex items-center justify-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[600px] gap-5 px-7 bg-white text-[#b0b0b0] rounded-[20px] flex flex-col items-center justify-center"
            >
                <div className="flex flex-row w-full mt-[10px] justify-between">
                    <div className="w-[10px]"></div>
                    <div className="flex flex-row bg-[#b0b0b0] cursor-pointer rounded-full">
                        <X onClick={() => setModalOpen(false)} width={18} height={18} color="#ffffff" />
                    </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                    <h1 className="text-[24px] leading-6 text-black">Введите новое значение</h1>
                </div>
                <div className="flex w-full flex-row items-center text-[18px] px-4 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                    <input
                        onChange={handleChange}
                        value={value}
                        placeholder="Начните вводить..."
                        className="w-[88%] text-black bg-white border-transparent focus:outline-0"
                        type="text"
                    />
                </div>
                <div
                    onClick={handleSubmit}
                    className="flex cursor-pointer items-center justify-center mb-[30px] py-3 rounded-[7px] bg-blue-500 text-[17px] leading-3 text-white w-full hover:bg-blue-600"
                >
                    Изменить
                </div>
            </div>
        </div>
    );
};
