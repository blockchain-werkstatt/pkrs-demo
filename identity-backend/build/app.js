'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _faucet = require('./route/faucet');

var _faucet2 = _interopRequireDefault(_faucet);

var _shamir = require('./route/shamir');

var _shamir2 = _interopRequireDefault(_shamir);

var _fuel = require('./route/fuel');

var _fuel2 = _interopRequireDefault(_fuel);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

app.use((0, _cors2.default)({ credentials: true, origin: true }));
app.disable('x-powered-by');

app.use((0, _morgan2.default)('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// Routes
app.use('/faucet', _faucet2.default);
app.use('/shamir', _shamir2.default);
app.use('/fuel', _fuel2.default);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  res.status(err.status || 500).render('error', {
    message: err.message
  });
});

exports.default = app;
//# sourceMappingURL=app.js.map