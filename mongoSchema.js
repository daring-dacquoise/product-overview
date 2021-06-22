import mongoose from 'mongoose';
const { Schema } = mongoose;

let products = new Schema({
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [{
    feature: String,
    value: String
  }]
  related_products: [{
    id: Number
  }]
});

let styles = new Schema({
  product_id: Number,
  results: [{
    id: Number,
    name: String,
    original_price: Number,
    sale_price: Number,
    default: Boolean,
    photos: [{
      thumbnail_url: String,
      url: String
    }]
  }],
  skus: [{
    id: Number,
    quantity: Number,
    size: String
  }]
});
