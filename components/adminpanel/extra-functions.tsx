'use client'
import {useEffect, useState} from "react";
import {list} from "../../services/users";
import {axiosInstance} from "../../services/instance";
import toast from "react-hot-toast";

interface Props{
    className?:string;
}

export const ExtraFunctions:React.FC<Props> = ({className})=>{
    const [email, setEmail] = useState("");
    const [amount, setAmount] = useState(0);

     const handleUpdateBalance = async () => {
        try {
            const response = await axiosInstance.patch('/update-balance', {
                email,
                amount
            });

            toast.success('Balance updated successfully');
            console.log('User updated:', response.data);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            toast.error('Failed to update balance');
        }
    };

    const handleMinusUpdateBalance = async () => {
        try {
            const response = await axiosInstance.patch('/minus-update-balance', {
                email,
                amount
            });

            toast.success('Balance updated successfully');
            console.log('User updated:', response.data);
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            toast.error('Failed to update balance');
        }
    };
    return (
        <div className="w-full bg-gray-100 flex">
            <div className="bg-white shadow-lg rounded-lg md:p-6 p-2 w-full overflow-x-auto">
                <h2 className="md:text-2xl text-[17px] text-black mb-6">Дополнительно</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="md:text-lg text-[14px] text-black font-medium mb-2">Начислить баланс</h3>
                        <input
                            type="email"
                            placeholder="E-Mail Клиента"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border bg-white text-black border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="number"
                            placeholder="Сумма"
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="border bg-white text-black border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button onClick={handleUpdateBalance} className="bg-blue-600 text-white px-6 py-2 rounded w-full">Начислить</button>
                    </div>


                    <div>
                        <h3 className="md:text-lg text-[14px] text-black font-medium mb-2">Снять баланс</h3>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="E-Mail Клиента"
                            className="border bg-white text-black border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="number"
                            placeholder="Сумма"
                            onChange={(e) => setAmount(Number(e.target.value))}
                            className="border bg-white text-black border-gray-300 rounded w-full p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button onClick={handleMinusUpdateBalance} className="bg-blue-600 text-white px-6 py-2 rounded w-full">Снять</button>
                    </div>
                </div>
            </div>
        </div>
    );

}