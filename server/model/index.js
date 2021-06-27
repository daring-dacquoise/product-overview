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

    if (rows.length === 0) {
      throw new Error(`Product not found: ${productId}`);
    };

    const featuresArr = rows.reduce((accum, row) => {
      if (row.feature === null || row.value === null) {
        return accum;
      }
      return accum.concat([{feature: row.feature, value: row.value}]);
    }, []);

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

    let queryStr = `SELECT *, p.id as photo_id, skus.id as sku_id FROM styles s LEFT JOIN photos p ON s.id = p.style_id LEFT JOIN skus ON s.id = skus.style_id WHERE s.product_id =${productId}`;

    const rows = await db.queryDb(queryStr);
    // console.log(rows)

    if (rows.length === 0) {
      throw new Error(`Product not found: ${productId}`);
    };

    let styleRows = {};

    rows.forEach((row) => {
      let styleId = row.style_id;
      if (styleRows[styleId] === undefined) {
        styleRows[styleId] = [];
      }
      styleRows[styleId].push(row);
    });


    const styles = Object.keys(styleRows).map((styleId) => {
      const rows = styleRows[styleId];

      let uniquePhotos = {};

      rows.forEach((row) => {
        if (uniquePhotos[row.photo_id] !== undefined) {
          return;
        }
        uniquePhotos[row.photo_id] = {thumbnail: row.thumbnail_url, url: row.url};
      });

      let uniqueSkus = {};

      rows.forEach((row) => {
        if (uniqueSkus[row.sku_id] !== undefined) {
          return;
        }
        uniqueSkus[row.sku_id] = {quantity: row.quantity, size: row.size};
      })

      return {
        style_id: styleId,
        name: rows[0].name,
        original_price: rows[0].original_price,
        sale_price: rows[0].sale_price,
        default: rows[0].default,
        photos: Object.values(uniquePhotos),
        skus: uniqueSkus
      };
    });

    return {
      product_id: productId.toString(),
      results: styles
    }

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
