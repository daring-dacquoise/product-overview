const router = require('express').Router();
const products = require('./controller');

router.get('/products', products.getProducts);
router.get('/products/:product_id', products.getProductDetail);
router.get('/products/:product_id/styles', products.getProductStyles);
router.get('/products/:product_id/related', products.getRelated);
router.get('/hello', (req, res) => {
  res.send('hi')
})

module.exports = router;
