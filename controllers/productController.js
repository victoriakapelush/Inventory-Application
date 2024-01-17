const { body, validationResult } = require("express-validator");

const Product = require('../models/product');

// Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

// Get a specific product by ID
exports.getProductById = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    next(error);
  }
};

// Edit a specific product
exports.editProduct = async (req, res, next) => {
    const productId = req.params.id;
  
    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.render('editProduct', { title: 'Edit Product', product });
    } catch (error) {
      next(error);
    }
  };

// Add more functions for other product-related operations (e.g., createProduct, updateProduct, deleteProduct, etc.)
