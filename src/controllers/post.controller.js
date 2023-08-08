const { postNew } = require("../models");

// Create Post
const createPost = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).send({
        message: "some field must be filled, cannot be empty",
      });
    }

    const input = await postNew.create({
      title: title,
      body: body,
    });

    return res.status(201).send({
      message: "post created",
    });
  } catch (error) {
    return res.send({
      message: "Cannot create new post",
    });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await postNew.findAll();
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch posts.",
    });
  }
};

// Get single post
const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await postNew.findByPk(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    return res.json(post);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch the post.",
    });
  }
};

// Update post by Id
const updatePostById = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, body } = req.body;

    // Check if the post with the given ID exists
    const post = await postNew.findByPk(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    // Update the post properties
    post.title = title;
    post.body = body;

    // Save the changes to the database
    await post.save();

    return res.json({
      message: "Post updated successfully.",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update the post.",
    });
  }
};

// Delete post by Id
const deletePostById = async (req, res) => {
  try {
    const postId = req.params.id;

    // Check if the post with the given ID exists
    const post = await postNew.findByPk(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found.",
      });
    }

    // Delete the post from the database
    await post.destroy();

    return res.json({
      message: "Post deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete the post.",
    });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
