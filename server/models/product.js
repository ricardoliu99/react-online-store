const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  inventoryCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
