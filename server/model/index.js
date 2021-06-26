const db = require('../../database');

module.exports = {
//get products
//page = 1, count = 5
  getAllProducts: async function(page = 1, count = 5) {
    // select * from products  LIMIT 10 OFFSET 0
    //offset = (page - 1)*20 ;
    // row_count = 20;
    // select * from table limit (offset, row_count);
    let offset = (page -1) * count;


    let queryStr = `select * from products limit ${count} offset ${offset}`;

    const response = await db.queryDb(queryStr);

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
    // console.log(queryStr)
    const response = await db.queryDb(queryStr);
    // console.log(response)

    const results = response.map((row) => {
      return row.current_product_id === productId
             ? row.related_product_id
             : row.current_product_id
             ;
    });

    return results;
  }
};
