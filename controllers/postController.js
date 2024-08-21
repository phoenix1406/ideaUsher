// Import the Post model to interact with the posts collection in the database
const Post = require("../models/post");
// Import the Tag model to interact with the tags collection in the database
const Tag = require("../models/tag");
// Import the mongoose library for MongoDB interactions
const mongoose  = require('mongoose');

// Get all posts with filtering, sorting, and pagination options
exports.getPosts = async (req, res) => {
    const { page = 1, limit = 10, sort = 'createdAt', keyword = '', tag } = req.query;

    try {
        // Build query conditions
        let query = {};

        // Keyword search
        if (keyword) {
            query.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }

        // Tag filter
        if (tag) {
            // Find the ObjectId of the tag
            const tagObject = await Tag.findOne({ name: tag.trim() });
         
            if (tagObject) {
                query.tags = tagObject._id; // Use the ObjectId of the tag for filtering
            } else {
                // If no matching tag is found, return an empty result
                return res.status(200).json({
                    docs: [],
                    totalDocs: 0,
                    limit: parseInt(limit),
                    page: parseInt(page),
                    totalPages: 0,
                    hasNextPage: false,
                    hasPrevPage: false
                });
            }
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { [sort]: -1 },  // Sort in descending order
            populate: 'tags'  
        };

        const posts = await Post.paginate(query, options);
       
       
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// api for Creating a new post
exports.createPost = async (req, res) => {
    const { title, description, tags } = req.body;
    const image = req.file ? req.file.buffer.toString('base64') : null;
     try {
        // Convert tags to array if they are not already an array to handle the data from form data format in postman
        const tagsArray = Array.isArray(tags) ? tags :tags.split(',').map(tag => tag.trim().replace(/^"|"$/g, ''));

        // Process each tag
        const tagObjects = await Promise.all(tagsArray.map(async (tag) => {
            // Check if tag exists
            let foundTag = await Tag.findOne({ name: tag });

            // If tag doesn't exist, create a new one
            if (!foundTag) {
                foundTag = new Tag({ name: tag });
                await foundTag.save();
            }

            return foundTag._id;
        }));

        const post = new Post({
            title,
            description,
            image,
            tags: tagObjects
        });
       
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};