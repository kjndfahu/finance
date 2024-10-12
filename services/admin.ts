import {axiosInstance} from "./instance";
import toast from "react-hot-toast";

export const handleUpdateBalance = async (email:string, amount:number) => {
    try {
        const response = await axiosInstance.patch('/api/user/update-balance', {
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