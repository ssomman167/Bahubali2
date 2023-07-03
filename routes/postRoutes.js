const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const authMiddleware = require('../middlwares/auth');

// Create a new post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create a new post
    const post = new Post({
      title,
      content,
    });

    // Save the post to the database
    await post.save();

    return res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all posts
router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error getting posts:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a specific post by ID
router.get('/:postId', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error('Error getting post:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
