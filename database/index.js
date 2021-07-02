const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.DATABASE_HOST || 'localhost',
  user: process.env.DATABASE_USER || 'root',
  port: 3306,
  password: process.env.DATABASE_PASSWORD || 'password',
  database: 'products',
  insecureAuth: true,
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
