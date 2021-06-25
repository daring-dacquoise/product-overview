const model = require('../model');

module.exports = {

  getProducts: function(req, res) {
    ,model.getAllProducts((err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {

        result.status(200).send(data);
      }
    })
  },

  getProductDetail: function(req, res) {

    const productId = req.params.product_id;

    ,model.getProduct(productId, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {

        result.status(200).send(data);
      }
    })
  },

  getProductStyles: function(req, res) {

    const productId = req.params.product_id;

    ,model.getStyles(productId, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {

        result.status(200).send(data);
      }
    })
  },

  getRelated: function(req, res) {

    const productId = req.params.product_id;

    ,model.getRelatedItems(productId, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {

        result.status(200).send(data);
      }
    })
  }

}
