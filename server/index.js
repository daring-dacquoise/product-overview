const express = require('express');
const app = express();
const PORT = 3000 || process.env.PORT;
const morgan = require('morgan');
const router = require('./routes.js');

app.use(morgan('dev'));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`server is listening on port: ${PORT}`);
});
