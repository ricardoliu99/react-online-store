const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");
const customerController = require("../controllers/customerController");

const mainGet = (req, res, next) => {
  res.render("main");
};

router.get("/", mainGet);

// product routes
router.post("/product/add", productController.productCreate);
router.get("/products", productController.productListGet);
router.delete("/product/:id/delete", productController.productDelete);
router.post("/product/:id/update", productController.productUpdate);

// customer routes
router.post("/customer/add", customerController.customerCreate);
router.get("/customer/:username", customerController.customerGet);
router.post("/login", customerController.customerLogIn);
router.post("/logout", customerController.customerLogOut);
router.post("/customer/:id/update", customerController.customerUpdate);
router.post("/customer/:id/addToCart", customerController.customerAddToCart);
router.get("/customer/:id/getCart", customerController.customerGetCart);
router.post(
  "/customer/:id/deleteFromCart",
  customerController.customerDeleteFromCart
);

module.exports = router;
