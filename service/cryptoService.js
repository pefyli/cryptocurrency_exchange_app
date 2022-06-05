const axios = require('axios');

const getLatestCryptoCurrencyList = async() => {
    let res = [];
    await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.API_KEY,
        },
    }).then(resp => {
        res = filterCrptoMoving(resp.data.data);
    }).catch(err => {
        // Handle Error Here
        console.error(err);
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
    let res = [];
    await axios.get('https://pro-api.coinmarketcap.com/v2/tools/price-conversion?convert_id='+convertToId+'&id='+convertFromId+'&amount='+amount, {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.API_KEY,
        },
    }).then(resp => {
        res = resp.data.data;
    }).catch(err => {
        // Handle Error Here
        console.error(err);
    });
    return res;
}

const getSupportedFiatCurrency = async() => {
    let res = [];
    await axios.get('https://pro-api.coinmarketcap.com/v1/fiat/map', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.API_KEY,
        },
    }).then(resp => {
        res = resp.data.data;
    }).catch(err => {
        // Handle Error Here
        console.error(err);
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