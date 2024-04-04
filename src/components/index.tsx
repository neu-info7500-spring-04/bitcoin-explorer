import POWAndEmission from "./POWAndEmission";
import TransactionFeeData from "./transactionFee/transactionFeeData";
import CountryNodeStats from "./CountryNodeStats";
import BTCMarketData from "./btc-market-data";
import RankingData from "./ispRanking/Ranking";
import DailyBlockCountData from "./dailyBlockCount/dailyBlockCountData";
import bitcoinExchangePrices from "./bitcoin-exchanges-price";

const components = {
    POWAndEmission,
    CountryNodeStats,
    TransactionFeeData,
    BTCMarketData,
    RankingData,
    DailyBlockCountData,
    bitcoinExchangePrices
};
export { components };
