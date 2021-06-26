const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
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
      console.log(`server is listening on port: ${PORT}`);
    });
  }
});
