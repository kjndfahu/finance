import {InvestmentManagement} from "../../../../../components/investpage/investment-management";
import {Tarrifs} from "../../../../../components/home/tarrifs/tarrifs";
import {VentureInvest} from "../../../../../components/investpage/venture-invest";
import {StocksEtf} from "../../../../../components/investpage/stocks-etf";
import {PublicIPOMarketInvest} from "../../../../../components/investpage/publicipo_market_invest";
import {StartNowInvest} from "../../../../../components/investpage/startnow-invest";


export default function InvestmentPage() {
    return (
        <div className="flex flex-col bg-[#FFFFFF] mdbvp:px-[100px] pt-[100px] smbvp:px-[30px] px-[10px]">
            <InvestmentManagement/>
            <Tarrifs/>
            <StocksEtf/>
            <VentureInvest/>
            <PublicIPOMarketInvest/>
            <StartNowInvest/>
        </div>
    )
}