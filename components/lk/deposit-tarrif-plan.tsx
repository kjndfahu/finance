'use client';
import { useTranslations } from "next-intl";
import { TarrifTabs } from "./tarrif-tabs";
import { useState } from "react";

import { StocksAndETFsTarrif } from "./stocksandetfs-tarrif";
import { ETFInfo } from "./etfinfo";
import { VenchurTarrif } from "./venchurtarrif";
import { VenchurInfo } from "./venchurinfo";
import { IPOTarffif } from "./ipotarrif";
import { IPOInfo } from "./ipoinfo";

interface Props {
    className?: string;
    value?: string;
    session: any;
}

export const DepositTarrifPlan: React.FC<Props> = ({ value, className, session }) => {
    const t = useTranslations("CreateDeposit");
    const [activeTab, setTab] = useState(1);
    const [lowPercent, setPercent] = useState('0');
    const [middlePercent, setMiddlePercent] = useState('0');
    const [highPercent, setHighPercent] = useState('0');
    const dataStocks = 30;
    const dataVenchur = 15;
    const dataIPO = 5;

    return (
        <div className="flex flex-col md:gap-5 gap-2 text-black bg-white border-[1px] border-[#f5f5f5] px-4 py-4 rounded-[10px]">
            <h4 className="md:text-[18px] text-[14px] text-black">{t('tariff-plan')}</h4>
            <TarrifTabs activeTab={activeTab} setTab={setTab} />
            {activeTab === 1 && (
                <>
                    <StocksAndETFsTarrif dataStocks={dataStocks} setPercent={setPercent} />
                    <ETFInfo session={session} value={value} dataStocks={dataStocks} lowPercent={lowPercent} />
                </>
            )}
            {activeTab === 2 && (
                <>
                    <VenchurTarrif setMiddlePercent={setMiddlePercent} />
                    <VenchurInfo value={value} dataVenchur={dataVenchur} middlePercent={middlePercent} />
                </>
            )}
            {activeTab === 3 && (
                <>
                    <IPOTarffif setHighPercent={setHighPercent} />
                    <IPOInfo value={value} dataIPO={dataIPO} highPercent={highPercent} />
                </>
            )}
        </div>
    );
};
