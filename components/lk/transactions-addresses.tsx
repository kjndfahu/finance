import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

interface Props {
    className?: string;
    setIsClicked: any;
    value: any;
    isSystem?: string;
    session: any;
}

export const TransactionsAdresses: React.FC<Props> = ({ session, isSystem, value, setIsClicked, className }) => {
    const t = useTranslations("TopUpPersonal");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bankingDetails, setBankingDetails] = useState<string | null>(null); // Стейт для хранения данных
    console.log(bankingDetails, 'banking')
    console.log(isSystem, 'system')
    const fetchBankingDetails = async () => {
        if (!isSystem) return;

        try {
            const response = await axios.post(`/api/bankcard`, { isSystem: 'TRC-20' });

            if (response.status === 200) {
                setBankingDetails(response.data.details);
            } else {
                throw new Error('Failed to fetch banking details');
            }
        } catch (error) {
            console.error('Error fetching banking details:', error.response?.data || error.message);
            toast.error(t('error-message'));
        }
    };

    useEffect(() => {
        fetchBankingDetails();
    }, [isSystem]);

    const handleTopUpRequest = async () => {
        const email = session?.user?.email;

        if (!email || !value) {
            toast.error(t('error-message'));
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('/api/topuprequest', {
                email,
                type: isSystem,
                sum: Number(value),
            });

            if (response.status === 200) {
                toast.success(t('success-message'));
                setIsClicked(false);
            } else {
                throw new Error('Failed to submit top-up request');
            }
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            toast.error(t('error-message'));
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log(bankingDetails)
    return (
        <div className="flex flex-col gap-5 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px]">
            <h4 className="text-[16px] text-[#777777]">{t('address-send')}</h4>
            <div className="flex cursor-pointer flex-row items-center gap-5">
                <h2 className="text-[20px] text-black py-1 px-3 rounded-[10px] hover:bg-[#f5f5f5]">
                    {bankingDetails || 'Loading...'}  {/* Отображаем данные */}
                </h2>
                <Copy color="#777777" />
            </div>
            <h4 className="text-[16px] text-[#777777]">{t('send-exactly')} ${value}! {t('otherwise')}</h4>
            <div className="flex flex-col gap-4 text-[17px]">
                <div
                    onClick={handleTopUpRequest}
                    className={`flex items-center cursor-pointer justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-[7px] py-3 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? t('submitting') : t('paid')}
                </div>
                <div
                    onClick={() => setIsClicked(false)}
                    className="flex items-center cursor-pointer justify-center text-black rounded-[7px] py-3 hover:bg-[#f5f5f5]">
                    {t('cancel-deposit')}
                </div>
            </div>
        </div>
    );
};
