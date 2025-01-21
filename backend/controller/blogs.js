const cloudinary = require('cloudinary').v2;
const { blogModel } = require("../model/blogs");
const mongoose = require("mongoose");

exports.getAllBlogs = async (req, res) => {
    try {
        const { draft, category } = req.query;

        // Construct the filter object
        const filter = { draft };

        // Add category filter if provided
        if (category) {
            filter.category = { $in: [category] };
        }

        const blogs = await blogModel.find(filter).sort({ order: 1 });
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).send("Internal Server Error");
        console.error(err);
    }
};

exports.getBlog = async (req, res) => {
    try {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid ID format");
        }

        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).send("Blog not found");
        }

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
    }
};


exports.createBlog = async (req, res) => {
    try {
        const { title, imagelink, summary, content, category, draft } = req.body;
        if (!title || !content) {
            return res.status(400).send("Missing one of the required fields: title, imagelink, or content");
        }

        const blogCount = await blogModel.countDocuments();

        const blog = {
            title, imagelink, summary, content, category, draft, date: Date.now(), order: blogCount + 1
        };

        const newBlog = await blogModel.create(blog);

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const { _id, title, imagelink, summary, content, category, draft } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send("Invalid ID format");
        }

        const updatedBlog = await blogModel.updateOne(
            { _id },
            { $set: { title, imagelink, summary, content, category, draft, date: Date.now() } }
        );

        if (updatedBlog.modifiedCount === 0) {
            return res.status(404).send("Blog not found or no changes made");
        }

        const blog = await blogModel.findById(_id);

        res.status(200).json(blog);
    } catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const { _id } = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send("Invalid ID format");
        }

        const deletedBlog = await blogModel.findByIdAndDelete(_id);

        if (!deletedBlog) {
            return res.status(404).send("Blog not found");
        }

        res.status(200).send("Blog deleted successfully");
    } catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
    }
}

exports.reorderBlogs = async (req, res) => {
    try {
        const { reorderedBlogs } = req.body;

        if (!reorderedBlogs || !Array.isArray(reorderedBlogs)) {
            return res.status(400).send("Invalid input: 'reorderedBlogs' must be an array.");
        }

        for (let index = 0; index < reorderedBlogs.length; index++) {
            const blog = reorderedBlogs[index];
            await blogModel.updateOne(
                { _id: blog._id },
                { $set: { order: index + 1 } }
            );
        }

        res.status(200).send("Blogs reordered successfully.");
    } catch (err) {
        res.status(500).send("Internal Server Error");
        console.error(err);
    }
};

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

exports.uploadImage = async (req, res) => {
    try {
        const imageBase64 = req.body.image;

        if (!imageBase64) {
            return res.status(400).json({ error: 'No Base64 image data provided' });
        }

        // Upload the Base64 image to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
            resource_type: 'auto', // Detects image/video automatically
        });

        // Send the URL of the uploaded image in the response
        res.status(200).json({ imageUrl: uploadResponse.secure_url });
    } catch (error) {
        console.error('Image upload failed:', error);
        res.status(500).json({ error: 'Image upload failed' });
    }
};