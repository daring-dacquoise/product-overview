require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const router = require('./routes.js');
const db = require('../database');

app.use(morgan('dev'));
app.use(express.json());
app.use(router);

//only bring server up if connected to db

db.connectDb((err) => {
  if (!err) {
    app.listen(PORT, () => {
      console.log(`hi server is listening on port: ${PORT}`);
    });
  }
});

// app.listen(PORT, () => {
//   console.log(`server is listening on port: ${PORT}`);
// });
