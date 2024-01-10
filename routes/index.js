// routes/index.js
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().exec();
    res.render('index', { title: 'be WEllfed Grocery store', products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
