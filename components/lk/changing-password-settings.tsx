'use client'
import { Eye, EyeOff, Lock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDebounce } from 'use-debounce';

interface Props {
    className?: string;
    session: any;
}

export const ChangingPasswordSettings: React.FC<Props> = ({ session, className }) => {
    const t = useTranslations('Settings');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [debouncedCurrentPassword] = useDebounce(currentPassword, 500);
    const [debouncedNewPassword] = useDebounce(newPassword, 500);
    const [debouncedConfirmPassword] = useDebounce(confirmPassword, 500);

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handlePasswordChange = async () => {
        if (debouncedNewPassword !== debouncedConfirmPassword) {
            toast.error(t('password-mismatch'));
            return;
        }

        try {
            const response = await axios.put('/api/change-password', {
                email: session.user.email,
                currentPassword: debouncedCurrentPassword,
                newPassword: debouncedNewPassword,
            });

            if (response.status === 200) {
                toast.success(t('password-updated'));
            } else {
                throw new Error('Failed to update password');
            }
        } catch (error) {
            toast.error('error');
            console.error('Error:', error.response?.data || error.message);
        }
    };

    return (
        <div className="flex flex-col gap-5 text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <h4 className="md:text-[22px] text-[17px]">{t('сhange-password')}</h4>
            <div className="flex flex-col gap-3 text-[#777777] md:text-[19px] text-[15px]">
                {/* Текущий пароль */}
                <div className="flex flex-col">
                    <h1>{t('old-password')}</h1>
                    <div className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                        <Lock width={20} color="#b0b0b0" />
                        <input
                            placeholder="*****"
                            type={showCurrentPassword ? "text" : "password"}
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-white border-transparent focus:outline-0"
                        />
                        {/* Иконка для отображения/скрытия */}
                        <div onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                            {showCurrentPassword ? <EyeOff width={20} color="#b0b0b0" /> : <Eye width={20} color="#b0b0b0" />}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1>{t('new-password')}</h1>
                    <div className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                        <Lock width={20} color="#b0b0b0" />
                        <input
                            placeholder="*****"
                            type={showNewPassword ? "text" : "password"} // Показать/скрыть пароль
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-white border-transparent focus:outline-0"
                        />
                        <div onClick={() => setShowNewPassword(!showNewPassword)}>
                            {showNewPassword ? <EyeOff width={20} color="#b0b0b0" /> : <Eye width={20} color="#b0b0b0" />}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1>{t('confirm-password')}</h1>
                    <div className="flex flex-row items-center px-4 py-1 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                        <Lock width={20} color="#b0b0b0" />
                        <input
                            placeholder="*****"
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-white border-transparent focus:outline-0"
                        />
                        <div onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff width={20} color="#b0b0b0" /> : <Eye width={20} color="#b0b0b0" />}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="flex items-center cursor-pointer justify-center py-2 md:text-[16px] text-[13px] text-white bg-blue-600 rounded-[10px] w-[25%] mt-3 hover:bg-blue-700"
                onClick={handlePasswordChange}
            >
                Save
            </div>
        </div>
    );
};
