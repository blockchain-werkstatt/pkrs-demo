import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import faucet from './route/faucet';
import shamir from './route/shamir';
import fuel from './route/fuel';
import cors from 'cors'

const app = express();

app.use(cors({credentials: true, origin: true}))
app.disable('x-powered-by');


app.use(logger('dev', {
  skip: () => app.get('env') === 'test'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/faucet', faucet);
app.use('/shamir', shamir);
app.use('/fuel', fuel);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
