const frisby = require('frisby');
const Joi = frisby.Joi;

it('GET one product should return product details including features for one product with status of 200', function() {
  return frisby
    .get('http://localhost:80/products/123')
    .expect('status', 200)
    .expect('jsonTypes', {
      id: Joi.number(),
      name: Joi.string(),
      slogan: Joi.string(),
      description: Joi.string(),
      category: Joi.string(),
      default_price: Joi.number(),
      features: Joi.array().items(
        Joi.object({
          feature: Joi.string(),
          value: Joi.string()
        })
      )
    })
});

it('GET styles should return styles including photos and skus for one product with status of 200', function() {
  return frisby
    .get('http://localhost:80/products/1234/styles')
    .expect('status', 200)
    .expect('jsonTypes', {
      product_id: Joi.number(),
      results: Joi.array().items(
        Joi.object({
          style_id: Joi.string(),
          name: Joi.string(),
          original_price: Joi.number(),
          sale_price: Joi.string(),
          photos: Joi.array().items(
            Joi.object({
              thumbnail: Joi.string(),
              url: Joi.string(),
            })
          )
        })
      )
    });
});

it('GET related items for one product should return status of 200 OK', function() {
  return frisby
    .get('http://localhost:80/products/88/related')
    .expect('status', 200)
});

it('GET all products should return a list of products with status 200', function() {
  return frisby
    .get('http://localhost:80/products')
    .expect('status', 200)
    .expect('jsonTypes', '*', {
      id: Joi.number(),
      name: Joi.string(),
      slogan: Joi.string(),
      description: Joi.string(),
      category: Joi.string(),
      default_price: Joi.number(),
    })
});
