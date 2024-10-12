import {axiosInstance} from "./instance";
import {BankingDetails, Deposits, TopUpOperations, TopUpRequest, User, WithdrawRequest} from "@prisma/client";

export const list = async() => {
    const {data} = await axiosInstance.get<User[]>('/users');
    return data;
}

export const bankDetails = async() => {
    const {data} = await axiosInstance.get<BankingDetails[]>('/cartdetails');
    return data;
}

export const withdrawtable = async() => {
    const {data} = await axiosInstance.get<WithdrawRequest[]>('/withdrawrequest');
    return data;
}

export const topuptable = async() => {
    const {data} = await axiosInstance.get<TopUpRequest[]>('/topuprequest');
    return data;
}

export const depositstable = async() => {
    const {data} = await axiosInstance.get<Deposits[]>('/deposits');
    return data;
}