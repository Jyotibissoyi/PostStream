# PostStream
 📮 Postify API

A RESTful API built with **Node.js** and **MongoDB** that allows users to create and manage blog posts with multiple tags and image uploads (stored in base64 format).

---

## 📌 Features

- Create and retrieve posts with:
  - Title, description, image (Aws)
  - Tag support (multiple tags per post)
- Filtering, sorting, and pagination of posts
- Keyword-based search (title/description)
- Tag-based filtering
- Image upload in aws format stored in MongoDB
- Input validation and proper error handling

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- aws s3 Image Handling
- RESTful API Architecture

---

## 📁 Project Structure

project-root/src
├── Aws/
├── controllers/
├── models/
├── routes/
├── .env
├── app.js
├── package.json
└── README.md

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

- git clone https://github.com/your-username/postify-api.git
cd PostStream
2. Install Dependencies
npm install
3. Setup Environment Variables
Create a .env file in the root with the following:

- PORT=3000
- MONGODB_URI=mongodb://localhost:27017/postify
4. Start the Server
npm start
Server will run at http://localhost:3000

# 📦 API Endpoints
📌 Tag APIs
Create Tag
POST /api/tags
{
  "name": "Technology"
}
Get All Tags
GET /api/tags

📝 Post APIs
Create Post
POST /api/posts

Request Body (JSON):

{
  "title": "My First Post",
  "desc": "This is a post with base64 image",
  "tags": ["tag_id1", "tag_id2"]
}
Get All Posts
GET /api/posts

# Query Parameters:

Param	Description
page	Page number (default: 1)
limit	Items per page (default: 10)
sort	Sorting order (asc, desc) by creation time
keyword	Keyword to match in title or description
tag	Tag ID to filter posts by

❌ Any additional unknown query params will return a 400 Bad Request

# 🧪 Example Queries
- GET /api/posts?page=1&limit=5&sort=desc&keyword=react&tag=6610b6eab123456789abcd12

# 📃 License
- This project is open source and available under the MIT License.

# 👤 Author
Jyoti Bissoyi
LinkedIn • GitHub


- Let me know if you’d like this `README` customized with your GitHub repo link or extra badges.