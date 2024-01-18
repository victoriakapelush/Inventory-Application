const express = require("express");
const router = express.Router();
const Product = require('../models/product');
const methodOverride = require('method-override');
const app = express();

app.use(methodOverride('_method'));

router.get('/:product_id', async (req, res) => {
  const product_id = req.params.product_id;

  try {
    const product = await Product.findOne({ _id: product_id }).exec();
    if (!product) {
      return res.status(404).send('Product not found');
    }
    const { product_name, product_image, product_description, product_price } = product;
    res.render('edit', { title: product_name, _id: product_id, product_name, product_image, product_description, product_price });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/:product_id', async (req, res) => {
  const product_id = req.params.product_id;
  const { product_name, product_price } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(product_id, { product_name, product_price }, { new: true });

    if (!updatedProduct) {
      return res.status(404).send('Product not found');
    }
    res.redirect('/');
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.delete('/:product_id', async (req, res) => {
  const product_id = req.params.product_id;

  try {
    const deletedProduct = await Product.findByIdAndDelete(product_id);

    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
