const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Route to render a form for adding a new product
router.get('/add', (req, res) => {
  res.render('addProduct'); // Assuming you have a template for adding a product
});

// Route to handle the submission of the new product form
router.post('/add', async (req, res) => {
  const { product_name, product_image, product_description, product_price } = req.body;

  try {
    const newProduct = new Product({
      product_name,
      product_image,
      product_description,
      product_price
    });

    const savedProduct = await newProduct.save();
    res.redirect('/');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;