const fs = require('fs');
const mysql = require('mysql');
const csv = require('fast-csv');

importCsvData2MySQL('product.csv');

// open sql connection
// start reading file
// on each row of data, insert into sql
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
    //fs.createReadStream opens a readable stream, pass in the path of the file
    const stream = fs.createReadStream(filename);
    //parseStream accepts a readable stream, pipes it to CSVParserStream
    const parser = csv.parseStream(stream)
    //data is an array of strings
    //['id', 'name', 'slogan', 'desc', 'category', default_price']
      .on('data', (data) => {
        counter++;
        //we want to skip the first row
        if (counter === 1) {
          return;
        }
        //pause the stream
        parser.pause();
        //insert data into db
        let queryStr = `INSERT INTO products (id, name, slogan, description, category, default_price) VALUES ("${data[0]}", "${data[1]}", "${data[2]}", "${data[3]}", "${data[4]}", "${data[5]}")`;
        // console.log(queryStr);
        connection.query(queryStr, (err, response) => {
          if (err) {
            console.log(err);
          }
          //resume the stream once data has been inserted
          parser.resume();
        });
      })
      .on('end', () => {
        console.log('done, parsed ' + counter + ' rows');
      });
  } catch (error) {
    console.log(error);
  }
};
