const mongoose = require('mongoose');

const conversionSchema = new mongoose.Schema({
    amount: Number,
    id: Number,
    last_updated: Date,
    name: String,
    quote: Map,
    symbol: String
},{_id : false});

const cryptoCurrencySchema = new mongoose.Schema({
    circulating_supply: String,
    cmc_rank: Number,
    date_added: Date,
    id: Number,
    last_updated: Date,
    max_supply: Number,
    name: String,
    quote: Map,
    conversion: {type: conversionSchema}
},{_id : false});

const CryptoCurrency = mongoose.model('CryptoCurrency', cryptoCurrencySchema);
module.exports = CryptoCurrency