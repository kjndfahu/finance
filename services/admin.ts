import {axiosInstance} from "./instance";
import {Deposits} from "@prisma/client";

export const depositstable = async() => {
    const {data} = await axiosInstance.get<Deposits[]>('/deposits');
    return data;
}