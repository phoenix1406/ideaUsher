const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const postSchema = new mongoose.Schema({
     // Title of the post, required field
    title: {
        type: String,
        required: true
    },
      // Description of the post, required field
    description: {
        type: String,
        required: true
    },
     // URL or path to the image associated with the post, optional field
    image: {
        type: String,
    },
    // Array of tags associated with the post
    // Each tag is referenced by its ObjectId from the Tag model
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
});

// Add paginate plugin to the schema
postSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', postSchema);
