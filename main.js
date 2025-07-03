const MarketDataFetcher = require('./services/marketDataFetcher');
const fetcher = new MarketDataFetcher();


async function run() {
    const symbols = fetcher.getStockList();

    for(const symbol of symbols) {
        await fetcher.getStockQuote(symbol);
    }
}


run();