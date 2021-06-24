const fs = require('fs');
const mysql = require('mysql');
const csv = require('fast-csv');

importCsvData2MySQL('product.csv');

// open sql connection
// start reading file
// on each row data, insert into sql
// read next row

async function importCsvData2MySQL(filename) {

  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'products'
  });

  try {
    console.log("Connecting to mysql");
    await connection.connect();
    console.log('CONNECTED TO MYSQL!');

    let counter = 0;

    //start reading the file
    // https://c2fo.github.io/fast-csv/docs/parsing/examples
    const stream = fs.createReadStream(filename);
    const parser = csv.parseStream(stream)
      .on('data', (data) => {
        counter++;

        if (counter === 1) {
          return;
        }

        parser.pause();

        let queryStr = `INSERT INTO products (id, name, slogan, description, category, default_price) VALUES ("${data[0]}", "${data[1]}", "${data[2]}", "${data[3]}", "${data[4]}", "${data[5]}")`;
        // console.log(queryStr);
        connection.query(queryStr, (err, response) => {
          if (err) {
            console.log(err);
          }
          parser.resume();
        });
      })
      .on('end', () => {
        console.log('done, parsed ' + counter + ' rows');
      });
  } catch (error) {
    console.log(error);
  }







      // let query = 'INSERT INTO products (id, name, slogan, description, category, default_price) VALUES ?';
      // connection.query(query, [csvData], (error, response) => {
      //   console.log('HERE: ERROR OR RESPONSE:')
      //   console.log(error || response);
      // });



  // let stream = fs.createReadStream(filename);
  // let csvData = [];
  // let csvStream = csv
  //   .parse()
  //   .on('data', (data) => {

  //     console.log(data);
  //     csvData.push(data);
  //   })
  //   .on('end', () => {
  //     csvData.shift();

      // const connection = mysql.createConnection({
      //   host: 'localhost',
      //   user: 'root',
      //   password: 'password',
      //   database: 'products'
      // });

      // connection.connect((error) => {
      //   if (error) {
      //     console.log('ERROR HERE:')
      //     console.error(error)
      //   } else {
      //     console.log('CONNECTED TO MYSQL!')
      //     let query = 'INSERT INTO products (id, name, slogan, description, category, default_price) VALUES ?';
      //     connection.query(query, [csvData], (error, response) => {
      //       console.log('HERE: ERROR OR RESPONSE:')
      //       console.log(error || response);
      //     });
      //   }
      // });
}
