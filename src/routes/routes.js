// routes/tagRoutes.js
const express = require('express');
const router = express.Router();
const {createTag, getTags} = require('../controllers/tagController');
const {createPost, getPosts} = require('../controllers/postController');

router.post('/tag/create', createTag);
router.get('/tag/get', getTags);
router.post('/post/create', createPost);
router.get('/post/get', getPosts);

module.exports = router;
