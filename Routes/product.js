const express = require("express");
const Router=express.Router();
const productController = require("../controller/product");

Router
  .post("/", productController.createProduct)
  .get("/", productController.getAllProducts)
  .get("/ssr", productController.getAllProductsSSR)
  .get("/add", productController.getAddForm)
  .get("/:id", productController.getProduct)
  .put("/:id", productController.replaceProduct)
  .patch("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct)

exports.Router=Router