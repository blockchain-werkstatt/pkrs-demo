'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _faucetController = require('../controller/faucetController');

const routes = (0, _express.Router)();


routes.get('/', (req, res) => {
  res.render('index', { title: 'Express Babel' });
});

routes.get('/ether', (req, res) => {
  const { address } = req.query;
  if (address == null || address === '') {
    res.send({ info: "no address included in params" });
    return;
  }
  (0, _faucetController.requestEther)(address, result => {
    res.send(result);
  });
});

exports.default = routes;
//# sourceMappingURL=faucet.js.map