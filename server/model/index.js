const db = require('../../database');

module.exports = {
//get products
  getAllProducts: async function() {
    let queryStr = `select * from products`;

    const response = await db.query(queryStr);

    return response;
  },

//get a product
  getProduct: async function(productId) {
    let queryStr = `select * from products where id=${productId}`;

    const response = await db.query(queryStr);

    return response;
  },

//get styles for a product
  getStyles: async function(productId) {
    let queryStr = `select * from styles where id=${productId}`;

    const response = await db.query(queryStr);

    return response;
  },

//get related items for a product
  getRelatedItems: async function(productId) {

    let queryStr = `select * from related_products where current_product_id=${productId} or related_product_id=${productId}`;
    console.log(queryStr)
    const response = await db.queryDb(queryStr);
    console.log(response)

    const results = response.map((row) => {
      return row.current_product_id === productId
             ? row.related_product_id
             : row.current_product_id
             ;
    });

    return results;
  },

  getTest: async function() {
    const result = await console.log('hi');
    return result;
  }
};
