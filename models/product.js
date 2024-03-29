const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  product_name: { type: String },
  product_description: { type: String },
  product_price: { type: String },
  product_image: { type: String }
});

module.exports = mongoose.model("Product", ProductSchema);
