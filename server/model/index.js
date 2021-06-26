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

    let queryStr = `select * from related_products where current_product_id=${id} or related_product_id=${id}`;
    console.log(queryStr)
    const response = await db.queryDb(queryStr);
    console.log(response)

    // console.log("also trying cb version")
    // db.query(queryStr, (error, result) => {
    //   console.log("done with cb")
    //   console.log("error=" + error)
    //   console.log("result...=");
    //   console.log(result);
    // });

    return response;
  },

  getTest: async function() {
    const result = await console.log('hi');
    return result;
  }
};
