const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

const mainGet = (req, res, next) => {
  res.render("main");
};

router.get("/", mainGet);
router.post("/product/add", productController.productCreatePost);
router.get("/product", productController.productsListGet);

module.exports = router;
