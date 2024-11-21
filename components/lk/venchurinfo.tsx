import { useEffect, useState } from "react";
import { addDays, format, isAfter } from "date-fns";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";
import {SuccessModal} from "../success-modal";

interface Props {
    className?: string;
    dataVenchur: number;
    middlePercent: string;
    value?: string;
    session: any;
    balance:any;
    setBalance:any;
}

export const VenchurInfo: React.FC<Props> = ({balance,
    setBalance,
                                                 session,
                                                 value = "0",
                                                 dataVenchur,
                                                 middlePercent,
                                                 className,
                                             }) => {
    const t = useTranslations("LK");
    const [status, setStatus] = useState<'INWORK' | 'FINISHED'>('INWORK');
    const depositSumAsNumber = parseFloat(value);
    const currentDatePlus15Days = addDays(new Date(), 15);
    const formattedEndDate = format(currentDatePlus15Days, 'dd.MM.yy HH:mm:ss');
    const [hasShownToast, setHasShownToast] = useState(false);

    const getDepositRange = (percent: string) => {
        switch (percent) {
            case '2':
                return { min: 3000, max: 5000 };
            case '2.5':
                return { min: 5000, max: 10000 };
            case '3':
                return { min: 10000, max: 50000 };
            default:
                return { min: 0, max: Infinity };
        }
    };

    const selectedRange = getDepositRange(middlePercent);
    const [isModal, setIsModal] = useState(false);
    const calculatingAllMoney = (value: string, dataVenchur: number, middlePercent: string) => {
        const newPercent = parseFloat(middlePercent);
        const newValue = parseFloat(value);
        return newValue + (newValue / 100 * newPercent * dataVenchur);
    };

    const totalMoney = calculatingAllMoney(value, dataVenchur, middlePercent);
    const calculatingEarning = (value: string, totalMoney: number) => {
        const newValue = parseFloat(value);
        return totalMoney - newValue;
    };

    const earnings = calculatingEarning(value, totalMoney);

    useEffect(() => {
        if (isAfter(new Date(), currentDatePlus15Days)) {
            setStatus('FINISHED');
        }
    }, [session.user.balance, currentDatePlus15Days]);

    useEffect(() => {
        if (
            !hasShownToast &&
            (depositSumAsNumber < selectedRange.min || depositSumAsNumber > selectedRange.max)
        ) {
            toast.error(`${t('toast-deposit-range')} ${selectedRange.min} ${t('for')} ${selectedRange.max}.`);
            setHasShownToast(true);
        }
    }, [depositSumAsNumber, selectedRange, hasShownToast]);

    useEffect(() => {
        setHasShownToast(false);
    }, [middlePercent]);

    const handleCreateDeposit = async () => {
        if (!value) {
            toast.error(`${t('toast-error')}`);
            return;
        }
        const depositSumAsNumber = parseFloat(value);
        if (depositSumAsNumber > session.user.balance) {
            toast.error(`${t('toast-success-balance')}`);
            return;
        }
        if (!middlePercent || middlePercent === '0') {
            toast.error(`${t('toast-noselected')}`);
            return;
        }
        const depositData = {
            login: session.user.name,
            balance: session.user.balance,
            depositSum: value,
            earning: earnings,
            percent: middlePercent,
            withdrawSum: totalMoney,
            endDate: currentDatePlus15Days,
            status
        };
        try {
            const response = await fetch('/api/venchurdeposit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(depositData),
            });
            if (response.ok) {
                setBalance(balance - +(value));
                toast.success(`${t('toast-deposit-success')}`);
                setIsModal(true);
            } else {
                toast.error(`${t('toast-error')}`);
            }
        } catch (error) {
            toast.error(`${t('toast-sendeing-error')}`);
        }
    };

    return (
        <div className="w-full mx-auto bg-white rounded-lg md:p-6">
            <h2 className="md:text-lg text-[15px] font-semibold mb-4">
                {t('personalinfodeposit')}
            </h2>

            <div className="grid grid-cols-3 gap-4 text-left">
                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">{t('exit-amount')}</p>
                    <p className="md:text-2xl text-[18px] font-bold">${isNaN(totalMoney) ? "0.00" : totalMoney.toFixed(2)}</p>
                </div>

                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">{t('accrued-profit')}</p>
                    <p className="md:text-2xl text-[18px] font-bold">${isNaN(earnings) ? "0.00" : earnings.toFixed(2)}</p>
                </div>

                <div>
                    <p className="md:text-[16px] text-[14px] text-gray-500">{t('end-date')}</p>
                    <p className="md:text-2xl text-[18px] font-bold">{formattedEndDate}</p>
                </div>
            </div>

            <button  onClick={() => {
                handleCreateDeposit();
            }}
                    className="w-full mt-4 bg-blue-600 text-white px-4 py-3 rounded-md">{t('create-deposit')}
            </button>
            {isModal && (
                <SuccessModal setIsModal={setIsModal} title={t('toast-deposit-success')}/>
            )}
        </div>
    );
};
