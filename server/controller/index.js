const model = require('../model');

module.exports = {

  getProducts: async function(req, res) {

    try {

      const results = await model.getAllProducts();
      res.status(200).send(results);

    } catch(error) {

      console.log(error)
      res.sendStatus(500);
    }

  },

  getProductDetail: async function(req, res) {

    const productId = req.params.product_id;

    try {

      const results = await model.getProduct(productId);
      res.status(200).send(results);

    } catch(error) {

      console.log(error)
      res.sendStatus(500);
    }
  },

  getProductStyles: async function(req, res) {

    const productId = req.params.product_id;

    try {

      const results = await model.getStyles(productId);
      res.status(200).send(results);

    } catch(error) {
      console.log(error)
      res.sendStatus(500);
    }
  },

  getRelated: async function(req, res) {

    const productId = req.params.product_id;
    console.log(productId)

    try {
      console.log('get related:')
      const results = await model.getRelatedItems(productId);
      console.log('returning:')
      console.log(results)
      res.status(200).send(results);
      console.log(results)
    } catch(error) {
      console.log('model error here:')
      console.log(error)
      res.sendStatus(500);
    }
  },

  test: async function(req, res) {
    const results = await model.getTest();
    res.send(results);
  }

}
