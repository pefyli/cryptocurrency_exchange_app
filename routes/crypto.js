var express = require('express');
var cryptoService = require('../service/cryptoService');
var router = express.Router();

router.get('/', function(req, res, next) {
  cryptoService.getLatestCryptoCurrencyList();
  res.send('respond with a resource');
});

module.exports = router;
