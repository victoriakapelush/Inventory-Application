// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Define routes using the controller functions
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/:id/edit', productController.editProduct); // Add this line for editing a specific product

// Add more routes for other product-related operations

module.exports = router;