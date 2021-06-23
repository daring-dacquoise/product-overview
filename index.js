const fs = require('fs');
const mysql = require('mysql');
const csv = require('fast-csv');

importCsvData2MySQL('sampleProduct.csv');

function importCsvData2MySQL(filename) {
  let stream = fs.createReadStream(filename);
  let csvData = [];
  let csvStream = csv
    .parse()
    .on('data', (data) => {
      csvData.push(data);
    })
    .on('end', () => {
      csvData.shift();

      const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'products'
      });

      connection.connect((error) => {
        if (error) {
          console.log('ERROR HERE:')
          console.error(error)
        } else {
          console.log('CONNECTED TO MYSQL!')
          let query = 'INSERT INTO products (id, name, slogan, description, category, default_price) VALUES ?';
          connection.query(query, [csvData], (error, response) => {
            console.log('HERE: ERROR OR RESPONSE:')
            console.log(error || response);
          });
        }
      });
    });

    stream.pipe(csvStream);
}