const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 

router.get('/', (req, res) => {
  res.render('addNew', { title: 'Add new product' }); 
});

router.post('/', upload.single('product_image'), async (req, res) => {
  const { product_name, product_description, product_price } = req.body;

  try {
    const newProduct = new Product({
      product_name,
      product_image: req.file.filename,
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