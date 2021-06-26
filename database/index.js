const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'products',
})

module.exports.connectDb = function(cb) {
  pool.getConnection((err) => {
    if (err) {
      console.error(err);
      connection.release();
      cb(err);
    } else {
      console.log('yay connected to mysql')
      cb(null);
    }
  })
};

module.exports.queryDb = function(queryString) {
  //for all my dbs, i want to return a promise based function

  //resolve, reject
  //when i cbb the db, i want to return a promise

  //if query doesnt work, cb tells me it doesn tit, reject the promise

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
