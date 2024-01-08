const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  product_id: { type: number, required: true },
  product_name: { type: String, required: true, maxLength: 100 },
  product_description: { type: String, required: true, maxLength: 500 },
  product_price: { type: number, required: true },
  product_image: { type: URL, required: true}
});

// Virtual for product's URL
ProductSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/product/${this._id}`;
  });

// Export model
module.exports = mongoose.model("Product", ProductSchema);
