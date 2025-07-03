require('dotenv').config();
const axios = require('axios');

class MarketDataFetcher {
    constructor() {
        this.apiKey = process.env.ALPHA_VANTAGE_API_KEY;
        this.baseUrl = 'https://www.alphavantage.co/query';
    }

    // Fetch daily stock time series data
    async getStockQuote(symbol) {
        try {
            const response = await axios.get(this.baseUrl, {
                params: {
                    function: 'TIME_SERIES_INTRADAY',
                    symbol: symbol,
                    interval: '5min',
                    apikey: this.apiKey
                }
            });
            
            
            const data = response.data['Time Series (5min)'];
            const latestTime = Object.keys(data)[0];
            const latestPrice = parseFloat(data[latestTime]['4. close']).toFixed(2);
            
            console.log(`✔️ ${symbol} latest price: $${latestPrice} at ${latestTime}`)
            return latestPrice;
        } catch(err) {
            console.error(`❌ Error fetching quote for ${symbol}:`, err.response?.data || err.message);
        }
    }

   
    getStockList() {
        return ['AAPL', 'TSLA', 'MSFT']; // Example watchlist
    }
}


module.exports = MarketDataFetcher;



