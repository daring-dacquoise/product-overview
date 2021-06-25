const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'movieList',
})

connection.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('yay connected to mysql')
  }
})

module.exports = connection;
