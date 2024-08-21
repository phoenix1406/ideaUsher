// Import the Express framework
const express = require('express');

// Import multer for handling file uploads
const multer = require('multer');

// Import the post controller functions
const { getPosts, createPost } = require('../controllers/postController');

// Create a new router object
const router = express.Router();

// Set up multer for image upload
// Use memory storage to store files as buffer objects
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define a route to get all posts
// This route will call the getPosts function from the post controller
router.get('/posts', getPosts);

// Define a route to create a new post
// This route will handle file uploads using multer and call the createPost function from the post controller
router.post('/posts', upload.single('image'), createPost);

// Export the router object to be used in other parts of the application
module.exports = router;