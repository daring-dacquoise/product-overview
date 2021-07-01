const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'my-app-db',
  user: 'iris',
  port: '3306',
  password: 'password',
  database: 'products',
})

module.exports.connectDb = function(cb) {
  pool.getConnection((err) => {
    if (err) {
      console.error(err);
      cb(err);
    } else {
      console.log('yay connected to mysql')
      cb(null);
    }
  })
};

module.exports.queryDb = function(queryString) {

  return new Promise((resolve, reject) => {
    pool.query(queryString, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
