var express = require('express');
var cryptoController = require('../controller/cryptoController');
var cryptoService = require('../service/cryptoService');
var router = express.Router();

router.get('/', async(req, res, next) => {
  let data = await cryptoController.getLatestCryptoCurrencyList();

  let convertFromId = req.query.convertFromId;
  let convertToId = req.query.convertToId;
  let amount = req.query.amount;

  if(convertFromId && convertToId && amount){
    let cyptoWithConversion = [];
    let isSupported = await cryptoService.checkIsSupportedCurrency(convertToId);
    if(isSupported){
      for(let i=0; i<data.length; i++){
        if(data[i].id == convertFromId){
          cyptoWithConversion = data[i];
          let conversion = await cryptoController.getPriceConversion(convertFromId, convertToId, amount);
          cyptoWithConversion.conversion = conversion;
        }
      }
      data = cyptoWithConversion;
    }else{
      throw new Error('Unsupported Conversion');
    }
  }
  res.json(data);
})

module.exports = router;
