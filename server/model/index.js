const db = require('../../database');

module.exports = {
//get products
//page = 1, count = 5
  getAllProducts: async function(page = 1, count = 5) {

    let offset = (page -1) * count;

    let queryStr = `select * from products limit ${count} offset ${offset}`;

    const response = await db.queryDb(queryStr);

    return response;
  },

  // SELECT * FROM products p LEFT JOIN features f ON p.id = f.product_id WHERE p.id = 3
//get a product
  getProduct: async function(productId) {
    let queryStr = `SELECT * from products p LEFT JOIN features f ON p.id = f.product_id WHERE p.id=${productId}`;

    const rows = await db.queryDb(queryStr);

    //transformation:
    ///array of objects

    //edge case: if there is no product or no features?

    const featuresArr = rows.map((row) => {
      return {feature: row.feature, value: row.value};
    });

    const product = {
        id: productId,
        name: rows[0].name,
        slogan: rows[0].slogan,
        description: rows[0].description,
        category: rows[0].slogan,
        default_price: rows[0].default_price,
        features: featuresArr
      };

    return product;
  },

//get styles for a product
  getStyles: async function(productId) {
    let queryStr = `select * from styles where id=${productId}`;

    const response = await db.queryDb(queryStr);
    console.log(response)



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
