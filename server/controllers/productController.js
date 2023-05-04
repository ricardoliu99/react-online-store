const Product = require("../models/product");

exports.productCreate = (req, res, next) => {
  const product = new Product(req.body);
  product
    .save()
    .then((prod) => res.json(prod))
    .catch((err) => next(err));
};

exports.productListGet = (req, res, next) => {
  Product.find()
    .sort({ name: 1 })
    .then((productsList) => res.json(productsList))
    .catch((err) => next(err));
};

exports.productDelete = (req, res, next) => {
  Product.findByIdAndRemove(req.params.id)
    .then((prod) => res.json(prod))
    .catch((err) => next(err));
};

exports.productUpdate = (req, res, next) => {
  const product = new Product(req.body);
  Product.findByIdAndUpdate(req.params.id, product)
    .then((prod) => res.json(prod))
    .catch((err) => next(err));
};
