**Post and Tag Management API**

This project is a RESTful API built using Node.js, Express, and MongoDB for managing posts and associated tags. The API supports features like pagination, sorting, keyword-based filtering, and tag-based filtering. It also includes functionality for uploading images either directly to MongoDB (in Base64 format).

**Features**
Create Posts: Create a post with a title, description, tags, and an optional image.
Manage Tags: Automatically create tags if they don't exist and then associating them with a post.
List Posts: Retrieve a paginated, sorted list of posts, filtered by keywords or tags.
Image Upload: Support for uploading images in Base64 format .
Error Handling: Detailed error handling with appropriate status codes and messages.


Endpoints
1. Create a Post
Endpoint: POST /api/posts

Description: Create a new post with title, description, tags, and an optional image.

Request Body:

title (string) - The title of the post (required)
description (string) - The description of the post (required)
tags (array of strings) - Tags associated with the post
image (file or base64 string) - The image associated with the post (optional)


2. Get All Posts
Endpoint: GET /api/posts

Description: Retrieve all posts with options for pagination, sorting, and filtering.

Query Parameters:

page (integer) - The page number for pagination (default: 1)
limit (integer) - The number of posts per page (default: 10)
sort (string) - The field to sort by (default: createdAt)
keyword (string) - Filter posts by a keyword in the title or description
tag (string) - Filter posts by a specific tag


**Setup and Installation**
Prerequisites
Node.js (v14.x or later)
MongoDB (v4.x or later)
npm or yarn


Installation
Clone the repository:
git clone https://github.com/phoenix1406/ideaUsher.git

Navigate into the project directory:
cd ideaUsher

Install dependencies:
npm install 

Create a .env file in the root of the project with the following environment variables:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/your-database


Start the server:
npm start or node server.js or nodemon server



Testing with Postman
You can test the API using the provided Postman collection:

Download Postman.
Import the provided Postman collection file (`IdeaUsher.postman_collection.json`).
Run the API requests directly from Postman.


The API should now be running at http://localhost:5000/api/posts.




