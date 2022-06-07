let cryptoService = require('../service/cryptoService');

const getLatestCryptoCurrencyList = async() => {
    let res = await cryptoService.getLatestCryptoCurrencyList();
    return res;
}

const getPriceConversion = async(convertFromId, convertToId, amount) => {
    let res = await cryptoService.getPriceConversion(convertFromId, convertToId, amount);
    return res;
}

module.exports = {
    getLatestCryptoCurrencyList, 
    getPriceConversion
};