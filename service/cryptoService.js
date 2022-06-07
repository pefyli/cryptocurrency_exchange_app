const axios = require('axios');
var base64 = require('base-64');
const CryptoCurrency = require('../model/cryptoCurrencyModel');
const Conversion = require('../model/conversionModel');

const getLatestCryptoCurrencyList = async() => {
    let res = [];
    await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            'X-CMC_PRO_API_KEY': base64.decode(process.env.API_KEY),
        },
    }).then(resp => {
        let topMovings = filterCrptoMoving(resp.data.data);
        //set up model
        topMovings.forEach(topMoving => {
            let cryptoCurrencyModel = new CryptoCurrency({
                circulating_supply: topMoving.circulating_supply,
                cmc_rank: topMoving.cmc_rank,
                date_added: topMoving.date_added,
                id: topMoving.id,
                last_updated: topMoving.last_updated,
                max_supply: topMoving.max_supply,
                name: topMoving.name,
                quote: topMoving.quote
            });
            res.push(cryptoCurrencyModel);
        });
    }).catch(err => {
        // Handle Error Here
        return err;
    });
    return res;
}

const filterCrptoMoving = (cryptos) =>{
    let topMoving = [];
    Object.keys(cryptos).forEach((element)=>{
        if ((cryptos[element].quote.USD.percent_change_24h > 0.5)||(cryptos[element].quote.USD.percent_change_24h < -0.5)) {
            topMoving.push(cryptos[element]);
        }
    }, {})
    return topMoving;
}

const getPriceConversion = async(convertFromId, convertToId, amount) => {
    let conversionModel;
    await axios.get('https://pro-api.coinmarketcap.com/v2/tools/price-conversion?convert_id='+convertToId+'&id='+convertFromId+'&amount='+amount, {
        headers: {
            'X-CMC_PRO_API_KEY': base64.decode(process.env.API_KEY),
        },
    }).then(resp => {
        let quoteConversion = resp.data.data;
        conversionModel = new Conversion({
            amount: quoteConversion.amount,
            id: quoteConversion.id,
            last_updated: quoteConversion.last_updated,
            name: quoteConversion.name,
            quote: quoteConversion.quote,
            symbol: quoteConversion.symbol,
        });
    }).catch(err => {
        // Handle Error Here
        return err;
    });
    return conversionModel;
}

const getSupportedFiatCurrency = async() => {
    let res = [];
    await axios.get('https://pro-api.coinmarketcap.com/v1/fiat/map', {
        headers: {
            'X-CMC_PRO_API_KEY': base64.decode(process.env.API_KEY),
        },
    }).then(resp => {
        res = resp.data.data;
    }).catch(err => {
        // Handle Error Here
        return err;
    });
    return res;
}

const checkIsSupportedCurrency = async(id) => {
    let currenices = await getSupportedFiatCurrency();
    let isSupported = false;
    currenices.forEach((element) =>{
      if(element.id == id){
          isSupported = true;
          return;
      }
    });
    return isSupported;
}

module.exports = {
    getLatestCryptoCurrencyList, 
    getPriceConversion,
    getSupportedFiatCurrency,
    checkIsSupportedCurrency
};

