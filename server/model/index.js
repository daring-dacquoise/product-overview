const db = require('../../database');

module.exports = {

  getAllProducts: async function(page = 1, count = 5) {

    let offset = (page -1) * count;

    let queryStr = `select * from products limit ${count} offset ${offset}`;

    const response = await db.queryDb(queryStr);

    return response;
  },

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

  getStyles: async function(productId) {

    let queryStr = `SELECT *, p.id as photo_id, skus.id as sku_id FROM styles s LEFT JOIN photos p ON s.id = p.style_id LEFT JOIN skus ON s.id = skus.style_id WHERE s.product_id =${productId}`;

    const rows = await db.queryDb(queryStr);

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
      });

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

    //before: we were looking through all the row data packets to find photos and skus for a given style
    //now: we start by organizing the rows per style, so when we look for skus and photos, we are only looking through the rows belonging to the style
    //we are now looking through a fraction of the rows
  },

  getRelatedItems: async function(productId) {

    let queryStr = `select * from related_products where current_product_id=${productId} or related_product_id=${productId}`;
    const response = await db.queryDb(queryStr);

    const results = response.map((row) => {
      return row.current_product_id === productId
             ? row.related_product_id
             : row.current_product_id
             ;
    });

    return results;
  }

  //saw the query was slow, -1164.663 ms
  //went to mysql server, (38 rows in set (0.93 sec) checked both conditions of the query independently, the current product id & related product id
  //found the culprit - the related product 35 rows in set (0.83 sec)
  //added a index for related product and reduced the speed 35 rows in set (0.01 sec)

};
