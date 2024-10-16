import { useTranslations } from "next-intl";
import { useState } from "react";
import { CalendarCheck2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
    className?: string;
    activeTab: number;
    setTab: any;
    setMinSum: (value: number | null) => void;
    setMaxSum: (value: number | null) => void;
    totalTopupSum: number;
    totalWithdrawSum: number;
}

export const AmountOfPayments: React.FC<Props> = ({
                                                      activeTab,
                                                      setTab,
                                                      setMinSum,
                                                      setMaxSum,
                                                      totalTopupSum,
                                                      totalWithdrawSum,
                                                      className
                                                  }) => {
    const t = useTranslations('History');
    const [minInput, setMinInput] = useState<string>('');
    const [maxInput, setMaxInput] = useState<string>('');
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]); // State for date range
    const [startDate, endDate] = dateRange;
    console.log(dateRange, 'dateRange')
    const handleMinSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinInput(e.target.value);
        setMinSum(e.target.value ? parseFloat(e.target.value) : null);
    };

    const handleMaxSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxInput(e.target.value);
        setMaxSum(e.target.value ? parseFloat(e.target.value) : null);
    };

    return (
        <div className="flex flex-col gap-3 md:text-[18px] text-[14px] text-black bg-white border-[1px] border-[#f5f5f5] p-4 rounded-[10px]">
            <div className="flex md:flex-row flex-col justify-between md:items-center items-start">
                <h4 className="text-[#777777]">{t('amount')}</h4>
                <div className="flex gap-3">
                    <h2 className="md:text-[22px] text-[15px] font-semibold text-green-500">+${totalTopupSum.toFixed(2)}</h2>
                    <h2 className="md:text-[22px] text-[15px] font-semibold">-${totalWithdrawSum.toFixed(2)}</h2>
                </div>
            </div>

            <div className="flex flex-row w-[100%] justify-between items-center text-[14px] md:w-[50%] px-2 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                <DatePicker
                    selected={startDate}
                    onChange={(dates: [Date | null, Date | null]) => setDateRange(dates)}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    dateFormat="dd.MM.yyyy"
                    placeholderText="с 05.04.24 до 14.04.24"
                    className="w-[100%] cursor-pointer bg-white border-transparent focus:outline-0"
                />
                <CalendarCheck2 color="#b0b0b0" />
            </div>

            <div className="flex md:w-[50vw] gap-3">
                <div className="flex flex-row items-center text-[14px] md:w-[30%] w-full px-2 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                    <input
                        value={minInput}
                        onChange={handleMinSumChange}
                        placeholder="Сумма от"
                        className="w-[88%] bg-white border-transparent focus:outline-0"
                        type="text"
                    />
                </div>
                <div className="flex flex-row items-center text-[14px] md:w-[30%] w-full px-2 py-2 gap-3 border-[1px] border-[#b0b0b0] rounded-[5px]">
                    <input
                        value={maxInput}
                        onChange={handleMaxSumChange}
                        placeholder="Сумма до"
                        className="w-[88%] bg-white border-transparent focus:outline-0"
                        type="text"
                    />
                </div>
            </div>

            <div className="flex w-full justify-between flex-row p-4 gap-5 bg-[#f5f5f5] rounded-[7px]">
                <h3 onClick={() => setTab(1)} className={`${activeTab === 1 ? 'text-black' : 'text-[#777777]'} cursor-pointer`}>{t('all')}</h3>
                <h3 onClick={() => setTab(2)} className={`${activeTab === 2 ? 'text-black' : 'text-[#777777]'} cursor-pointer`}>{t('deposits')}</h3>
                <h3 onClick={() => setTab(3)} className={`${activeTab === 3 ? 'text-black' : 'text-[#777777]'} cursor-pointer`}>{t('withdrawal')}</h3>
            </div>
        </div>
    );
};
