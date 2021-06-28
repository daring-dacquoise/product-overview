const frisby = require('frisby');

it('GET all products should return status of 200 OK', function() {
  return frisby
    .get('http://localhost:3000/products')
    .expect('status', 200);
});

it('GET one product detail should return status of 200 OK', function() {
  return frisby
    .get('http://localhost:3000/products/123')
    .expect('status', 200);
});

it('GET styles for one product should return status of 200 OK', function() {
  return frisby
    .get('http://localhost:3000/products/1234/styles')
    .expect('status', 200);
});

it('GET related items for one product should return status of 200 OK', function() {
  return frisby
    .get('http://localhost:3000/products/88/related')
    .expect('status', 200);
});
