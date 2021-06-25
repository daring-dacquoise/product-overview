const db = require('../../database');

module.exports = {
//get products
  getAllProducts: async function() {
    let queryStr = `select * from products`;

    try {
      await db.query(queryStr);

    } catch (error ) {

    }
    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(err)
        cb(err, null)
      } else {
        cb(null, results);
      }
    })
  },

//get a product
  getProduct: function(id, cb) {
    let queryStr = `select * from products where id=${id}`;

    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(err)
        cb(err, null)
      } else {
        cb(null, results);
      }
    })
  },

//get styles for a product
  getStyles: function(id, cb) {
    let queryStr = `select * from styles where id=${id}`;

    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(err)
        cb(err, null)
      } else {
        cb(null, results);
      }
    })
  },

//get related items for a product
  getRelatedItems: function(id, cb) {
    let queryStr = `select * from related_products where id=${id}`;

    db.query(queryStr, (err, results) => {
      if (err) {
        console.log(err)
        cb(err, null)
      } else {
        cb(null, results);
      }
    })
  }

};
