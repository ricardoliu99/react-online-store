const Product = require("../models/product");

exports.productCreatePost = async (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  const newProduct = await product.save();
};

exports.productsListGet = (req, res, next) => {
  Product.find()
    .sort({ name: 1 })
    .then(function (productsList) {
      res.json(productsList);
    })
    .catch((err) => {
      return next(err);
    });
};
