const express = require("express");
const router = express.Router();
const Product = require('../models/product');

router.get('/:product_id', async (req, res) => {
  const product_id = req.params.product_id;

  try {
    const product = await Product.findOne({ product_id }).exec();
    if (!product) {
      return res.status(404).send('Product not found');
    }
    const { product_name, product_image, product_description, product_price } = product;
    res.render('edit', { product_name, product_image, product_description, product_price });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;