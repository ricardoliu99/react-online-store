const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    maxLength: 50,
  },
  phone: {
    type: String,
    required: true,
    maxLength: 50,
  },
  address: {
    type: String,
    maxLength: 50,
  },
  cart: [{ product: { type: String, ref: "Product" }, quantity: Number }],
});

module.exports = mongoose.model("Customer", CustomerSchema);
