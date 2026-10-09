const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', require('./routes'));

//Phan xu ly loi
//loi request not found 404
app.use((req, res, next) => {
  const error = new Error("Request not found");
  error.statusCode = 404;
  next(error);
});

//Xu ly tat ca cac loi con lai




app.use(require('./middlewares/errorHandler'));

module.exports = app;
