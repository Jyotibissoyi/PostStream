const Post = require('../models/posts');
const Tag = require('../models/tags');
const aws = require('../aws/aws');

exports.createPost = async (req, res) => {
    try {
        const bodyData = req.body
        const { title, description, tags } = bodyData;
        let files = req.files;
if(!title || !description || !tags){
    return res.status(400).json({
        status: false,
        error: 'Please provide title description and tag Id.'
    });
}
// uploade image in aws

const uploadedFileURL = await aws.uploadFile(files[0]);
console.log(uploadedFileURL)
        if(!uploadedFileURL){
            return res.status(400).json({
                status: false,
                error: '----?.'
            });
        }
        bodyData.image = uploadedFileURL;


        // Validate tag IDs
        const existingTags = await Tag.find({ _id: { $in: tags } });
        if (existingTags.length !== tags.length) {
            return res.status(400).json({
                status: false,
                error: 'Invalid tag Id'
            });
        }

        const post = new Post(bodyData);
        await post.save();
        res.status(201).json({
            status: true,
            message: 'Post created successfully.',
            post
        });
    } catch (err) {
        console.log(err);
        
        res.status(500).json({ error: err.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const allowedParams = ['page', 'limit', 'sort', 'keyword', 'tag'];
        const extraParams = Object.keys(req.query).filter(
            (key) => !allowedParams.includes(key)
        );

        if (extraParams.length) {
            return res.status(400).json({ error: `Invalid query params: ${extraParams.join(', ')}` });
        }

        const { page , limit = 10, sort = '-createdAt', keyword, tag } = req.query;
        const filter = {};

        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { desc: { $regex: keyword, $options: 'i' } }
            ];
        }

        if (tag) {
            filter.tags = tag;
        }

        const posts = await Post.find(filter)
            .populate('tags')
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({
            status: true,
            message: 'Post fetch successfully.',
            count : posts.length,
            posts
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
