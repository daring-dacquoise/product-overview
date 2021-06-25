const db = require('../../database');

module.exports = {
//get products
  getAllProducts: async function() {
    let queryStr = `select * from products`;

    const response = await db.query(queryStr);

    return response;
  },

//get a product
  getProduct: async function(id) {
    let queryStr = `select * from products where id=${id}`;

    const response = await db.query(queryStr);

    return response;
  },

//get styles for a product
  getStyles: async function(id) {
    let queryStr = `select * from styles where id=${id}`;

    const response = await db.query(queryStr);

    return response;
  },

//get related items for a product
  getRelatedItems: async function(id) {
    let queryStr = `select * from related_products where id=${id}`;

    const response = await db.query(queryStr);

    return response;
  }
};
