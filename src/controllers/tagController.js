// controllers/tagController.js
const tagModel = require('../models/tags');

exports.createTag = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({
            status: false,
            error: 'Please provide tag name.'
        });
        const existing = await tagModel.findOne({ name });
        if (existing) return res.status(400).json({
            status: false,
            error: 'Tag already exists'
        });

        const tag = new tagModel({ name });
        await tag.save();

        res.status(201).json({
            status: true,
            message: 'Tag created successfully.',
            tag
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTags = async (req, res) => {
    try {
        const tags = await tagModel.find();
        res.status(200).json({
            status: true,
            message: 'Tag data fetch successfully.',
            tags
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
