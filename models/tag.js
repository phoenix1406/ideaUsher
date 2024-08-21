// Import the mongoose library for MongoDB interactions
const mongoose = require('mongoose');

// Define the schema for a Tag
// The schema includes a 'name' field which is a required and unique string
const tagSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
}, 
// Add timestamps to the schema to automatically manage createdAt and updatedAt fields
{ timestamps: true });

// Export the Tag model based on the tagSchema
module.exports = mongoose.model('Tag', tagSchema);