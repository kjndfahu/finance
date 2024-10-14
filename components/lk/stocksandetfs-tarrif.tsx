import { useTranslations } from "next-intl";
import { useState } from "react";

interface Props {
    className?: string;
    setPercent: any;
    dataStocks: number;
}

export const StocksAndETFsTarrif: React.FC<Props> = ({ dataStocks, setPercent, className }) => {
    const t = useTranslations('History');
    const [isType, setType] = useState('0');

    const tariffRanges = {
        '15': { min: 100, max: 1000, percent: 0.9 },
        '30': { min: 1000, max: 2000, percent: 1.3 },
        '50': { min: 2000, max: 3000, percent: 1.7 },
    };

    return (
        <div className="flex flex-col md:gap-5 gap-2 text-black border-[#f5f5f5] md:px-4 py-2 border-b-[2px]">
            <h4 className="md:text-[16px] text-[13px] text-[#000000]">
                Акции и ETF - срок работы 30 дней, прибыль начисляется ежедневно, сумма инвестиций приходит в последний день депозита.
            </h4>
            <div className="flex flex-row md:w-[75%] md:gap-5 gap-1">
                {Object.entries(tariffRanges).map(([key, { min, max, percent }]) => (
                    <div
                        key={key}
                        onClick={() => {
                            setType(key);
                            setPercent(percent.toString());
                        }}
                        className={`${isType === key ? 'bg-[#f5f5f5]' : 'bg-white'} flex w-full cursor-pointer flex-col md:text-[16px] text-[12px] border-[1px] rounded-[10px] border-[#b0b0b0] gap-2 font-semibold md:px-3 px-1 md:py-4 py-2`}
                    >
                        <h2>Индекс на {key} акций</h2>
                        <ul className="flex flex-col font-normal list-disc md:px-6 px-4 gap-1">
                            <li>{dataStocks} дней</li>
                            <li>{percent}% ежедневно</li>
                            <li>${min}-${max}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};
