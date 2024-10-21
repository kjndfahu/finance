import { addDays, format, isAfter } from "date-fns";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

interface Props {
    className?: string;
    dataStocks: number;
    lowPercent: string;
    value?: string;
    session: any;
}

export const ETFInfo: React.FC<Props> = ({ value = "0", dataStocks, lowPercent, className, session }) => {
    const [status, setStatus] = useState<'INWORK' | 'FINISHED'>('INWORK');
    const depositSumAsNumber = parseFloat(value) || 0; // Убедитесь, что значение - это число
    const t = useTranslations('LK');
    const getDepositRange = (percent: string) => {
        switch (percent) {
            case '0.9':
                return { min: 100, max: 1000 };
            case '1.3':
                return { min: 1000, max: 2000 };
            case '1.7':
                return { min: 2000, max: 3000 };
            default:
                return { min: 0, max: Infinity };
        }
    };

    const selectedRange = getDepositRange(lowPercent);

    const calculatingAllMoney = (value: string, dataStocks: number, lowPercent: string) => {
        const newPercent = parseFloat(lowPercent) || 0;
        const newValue = parseFloat(value) || 0;
        return newValue + (newValue / 100 * newPercent * dataStocks);
    };

    const totalMoney = calculatingAllMoney(value, dataStocks, lowPercent);
    const calculatingEarning = (value: string, totalMoney: number) => {
        const newValue = parseFloat(value) || 0;
        return totalMoney - newValue;
    };

    const earnings = calculatingEarning(value, totalMoney);
    const currentDatePlus30Days = addDays(new Date(), 30);
    const formattedEndDate = format(currentDatePlus30Days, 'dd.MM.yy HH:mm:ss');

    useEffect(() => {
        if (isAfter(new Date(), currentDatePlus30Days)) {
            setStatus('FINISHED');
        }
    }, [session.user.balance, currentDatePlus30Days]);

    useEffect(() => {
        if (depositSumAsNumber < selectedRange.min || depositSumAsNumber > selectedRange.max) {
            toast.error(`${t('toast-deposit-range')} ${selectedRange.min} ${t('for')}${selectedRange.max}.`);
            return;
        }
    }, [depositSumAsNumber, lowPercent]);

    const handleCreateDeposit = async () => {
        const depositSumAsNumber = parseFloat(value) || 0; // Убедитесь, что значение - это число
        if (depositSumAsNumber > session.user.balance) {
            toast.error(`${t('toast-success-balance')}`);
            return;
        }
        if (!lowPercent || lowPercent === '0') {
            toast.error(`${t('toast-noselected')}`);
            return;
        }
        const depositData = {
            login: session.user.name,
            balance: session.user.balance,
            depositSum: value,
            earning: earnings,
            percent: lowPercent,
            withdrawSum: totalMoney,
            endDate: currentDatePlus30Days,
            status
        };
        try {
            const response = await fetch('/api/deposits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(depositData),
            });
            if (response.ok) {
                toast.success(`${t('toast-deposit-success')}`);
            } else {
                toast.error(`${t('toast-error')}`);
            }
        } catch (error) {
            toast.error(`${t('toast-sendeing-error')}`);
        }
    };

    return (
        <div className="w-full mx-auto bg-white rounded-lg md:p-6">
            <h2 className="md:text-lg text-[15px] font-semibold mb-4">{t('personalinfodeposit')}</h2>

            <div className="grid grid-cols-3 gap-4 text-left">
                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">{t('exit-amount')}</p>
                    <p className="md:text-2xl text-[18px] font-bold">${totalMoney.toFixed(2) || '0.00'}</p>
                </div>

                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">{t('accrued-profit')}</p>
                    <p className="md:text-2xl text-[18px] font-bold">${earnings.toFixed(2) || '0.00'}</p>
                </div>

                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">{t('end-date')}</p>
                    <p className="md:text-2xl text-[18px] font-bold">{formattedEndDate}</p>
                </div>
            </div>

            <button onClick={handleCreateDeposit} className="w-full mt-4 bg-blue-600 text-white px-4 py-3 rounded-md">{t('create-deposit')}</button>
        </div>
    );
};
