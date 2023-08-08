const express = require("express");
const {
  allProduct,
  productById,
} = require("../controllers/product.controller");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/", allProduct);
router.get("/:productId", productById);

module.exports = router;
