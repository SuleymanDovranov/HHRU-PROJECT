const express = require('express');
const AppError = require('./utils/appError');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(express.json({ limit: '10kb' }));

app.use(cors());

app.use(require('body-parser').json());
app.use(morgan('dev'));
app.use('/hhru', require('./routes/userRouter'));

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(require('./controllers/errController'));

module.exports = app;
