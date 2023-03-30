#! /usr/bin/env node

console.log(
  'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Product = require("./models/product");

const products = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false); // Prepare for Mongoose 7

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

async function productCreate(name, price, description) {
  const priceFormatted = price.toFixed(2);
  const product = new Product({ name, price: priceFormatted, description });
  await product.save();
  products.push(product);
  console.log(`Added product: ${name}`);
}

async function createProducts() {
  console.log("Adding products");
  await Promise.all([
    productCreate("name1", 1, "description1"),
    productCreate("name2", 2.0, "description2"),
    productCreate("name3", 3.065, "description3"),
  ]);
}
