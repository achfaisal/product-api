const express = require("express");
const {
  allProduct,
  productById,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", allProduct);
router.get("/:productId", productById);

module.exports = router;
