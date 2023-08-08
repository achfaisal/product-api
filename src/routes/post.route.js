const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
} = require("../controllers/post.controller");
const router = express.Router();

// POST route to create a new post
router.post("/", createPost);

router.get("/get", getAllPosts);
router.get("/get/:id", getPostById);
router.put("/update/:id", updatePostById);
router.delete("/delete/:id", deletePostById);

module.exports = router;
