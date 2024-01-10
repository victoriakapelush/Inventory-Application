#! /usr/bin/env node
const crypto = require("crypto");

console.log(
    'This script populates some products to your database.'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Product = require("./models/product");
  
  const products = [];

  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createProducts();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function createProduct(id, name, description, price, image_path) {
    const product = new Product({ 
      product_id: id, 
      product_name: name, 
      product_description: description, 
      product_price: price, 
      product_image: image_path });
    await product.save();
    console.log(`Added product: ${name}`);
  }
  
  async function createProducts() {
    console.log("Adding products");
    const imageFolderPath = "./images/";

    await Promise.all([
        createProduct(
          crypto.randomBytes(16).toString("hex"), 
          "Chicken Fajitas with Guacamole and Cheddar Cheese", 
          "Features grilled chicken strips, colorful bell peppers, and onions atop crisp greens, complemented by creamy guacamole and melted cheddar cheese, offering a refreshing twist on the classic Tex-Mex flavors in salad form.", 
          "$15", 
          imageFolderPath + "chickenFajitas.jpg"),
        createProduct(
          crypto.randomBytes(16).toString("hex"), 
          "Classic Chicken Salad with Croutons and Parmesan", 
          "Indulge in the timeless elegance of our Classic Chicken Salad, featuring tender chicken, crisp croutons, and savory Parmesan, harmoniously blended to create a palate-pleasing symphony of flavors and textures.", 
          "$22", 
          imageFolderPath + "chickenSalad.jpg"),
        createProduct(
          crypto.randomBytes(16).toString("hex"), 
          "Veggie Lentil Ziti-Style Pasta Bake with Roasted Veg", 
          "Savor the goodness of our Veggie Lentil Ziti-Style Pasta Bake, where roasted vegetables and wholesome lentil ziti come together in a delightful medley of flavors.", 
          "$9", 
          imageFolderPath + "zitiStyle.jpg"),
        createProduct(
          crypto.randomBytes(16).toString("hex"), 
          "Moroccan lamb tagine with eggplant and raisins", 
          "Experience the rich flavors of our Moroccan Lamb Tagine with Eggplant and Raisins, a culinary masterpiece that brings together tender lamb, succulent eggplant, and sweet raisins in a delightful harmony of tastes.", 
          "$39", 
          imageFolderPath + "tagine.jpg"),
        createProduct(
          crypto.randomBytes(16).toString("hex"), 
          "Papaya Smoothie for Weight Loss", 
          "Revitalize your wellness journey with our Papaya Smoothie, blending the tropical goodness of papaya into a refreshing and nutritious concoction designed to support your health goals.", 
          "$17", 
          imageFolderPath + "papaya.jpg"),
        createProduct(
          crypto.randomBytes(16).toString("hex"), 
          "Wellness Ginger Turmeric Shot (Immunity Booster)", 
          "Elevate your well-being with our Wellness Ginger Turmeric Shot, a potent immunity booster crafted to invigorate your senses and support your overall health.", 
          "$7", 
          imageFolderPath + "shot.jpg"),
        createProduct(
          crypto.randomBytes(16).toString("hex"), 
          "Egg, Spinach and Feta Breakfast", 
          "Start your day with a burst of flavor and nutrition with our Egg, Spinach, and Feta Breakfast, a delightful combination that brings together the richness of eggs, the freshness of spinach, and the savory goodness of feta.", 
          "$20", 
          imageFolderPath + "feta.jpg"),
        createProduct(
          crypto.randomBytes(16).toString("hex"), 
          "Cornmeal Crust Hand Pie, Huevos Rancheros", 
          "Delight in a flavorful experience with our Cornmeal Crust Hand Pie, Huevos Rancheros edition, where a golden cornmeal crust envelops the savory goodness of huevos rancheros, creating a handheld delight for your taste buds.", 
          "$24", 
          imageFolderPath + "cornmeal.jpg")
      ]);
  }