const express = require("express");
const {
  create,
  login,
  update,
  deleteUser,
} = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/", create);
router.post("/login", login);
router.put("/update", verifyToken, update);
router.delete("/delete", verifyToken, deleteUser);

module.exports = router;
