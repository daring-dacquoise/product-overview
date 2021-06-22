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
  }],
  styles: [
    style_id: Number,
    name: String,
    original_price: Number,
    sale_price: Number,
    default: Boolean,
    photos: [{
      thumbnail_url: String,
      url: String
    }],
    sku_ids: [Number],
  ]
});

let relatedProducts = new Schema({
  id: Number,
  product_id: Number,
  related_product_id: Number
})

let skus = new Schema({
  id: Number,
  quantity: Number,
  size: String
})
