const mongoose = require('mongoose');
const conversionSchema = new mongoose.Schema({
    amount: Number,
    id: Number,
    last_updated: Date,
    name: String,
    quote: Map,
    symbol: String
},{_id : false});

const Conversion = mongoose.model('Conversion', conversionSchema);
module.exports = Conversion