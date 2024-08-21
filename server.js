// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import the Express framework
const express = require('express');

// Import body-parser to parse incoming request bodies
const bodyParser = require('body-parser');

// Import the database configuration
const db = require('./config/db');

// Create an instance of an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route for handling post-related requests
// This will handle routes like /api/posts for getting and creating posts
app.use('/api', require('./routes/posts'));

// Define the port the server will listen on, defaulting to 5000 if not specified in environment variables
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});