'use client'
import {useTranslations} from "next-intl";
import {useEffect, useState} from "react";
import axios from "axios";

interface Props{
    className?:string;
    session:any;
}

interface User {
    email: string;
    name: string;
    surname: string;
    phoneNumber: string;
    region: number;
    telegramId: string;
}

export const Settings: React.FC<Props> = ({ className, session }) => {
    const t = useTranslations('Settings');
    const [userData, setUserData] = useState<User | null>(null);
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`/api/getUser?login=${session.user.name}`);
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData(); // Загружаем данные пользователя при монтировании компонента
    }, [session.user.name]);

    if (!userData) {
        return <div>Loading...</div>; // Отображение во время загрузки данных
    }
    return (
        <div className="flex flex-col md:gap-10 gap-5 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <h4 className="md:text-[22px] text-[17px]">{t('settings')}</h4>
            <div className="flex md:flex-row flex-col md:gap-20 gap-3">
                <div className="flex flex-col gap-3 text-[#777777] text-[19px]">
                    <div className="flex flex-col">
                        <h1 className="md:text-[18px] text-[15px]">{t('mail')}</h1>
                        <div className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="md:text-[18px] text-[15px]">{userData.email}</h4>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="md:text-[18px] text-[15px]">{t('name')}</h1>
                        <div className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="md:text-[18px] text-[15px]">{userData.name}</h4>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="md:text-[18px] text-[15px]">{t('surname')}</h1>
                        <div className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="md:text-[18px] text-[15px]">{userData.surname}</h4>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 text-[#777777] text-[19px]">
                    <div className="flex flex-col">
                        <h1 className="md:text-[18px] text-[15px]">{t('phone')}</h1>
                        <div className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="md:text-[18px] text-[15px]">{userData.phoneNumber}</h4>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="md:text-[18px] text-[15px]">{t('region')}</h1>
                        <div className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="md:text-[18px] text-[15px]">{userData.region}</h4>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="md:text-[18px] text-[15px]">{t('telegram')}</h1>
                        <div className="flex flex-row items-center bg-[#f5f5f5] border-[1px] border-[#777777] rounded-[5px] px-4 py-1 text-[#777777] gap-3">
                            <h4 className="md:text-[18px] text-[15px]">@{userData.telegramId}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};