const axios = require('axios');

const getLatestCryptoCurrencyList = () => {
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
            'X-CMC_PRO_API_KEY': process.env.API_KEY,
        },
    }).then(resp => {
        console.log(resp.data);
    }).catch(err => {
        // Handle Error Here
        console.error(err);
    });    
}

module.exports = {
    getLatestCryptoCurrencyList, 
};