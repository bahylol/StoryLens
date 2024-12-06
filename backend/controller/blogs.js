const { blogModel } = require("../model/blogs");
const mongoose = require("mongoose");

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        res.status(200).json(blogs);
    } catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
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
        const { title, imagelink, content } = req.body;
        if (!title || !imagelink || !content) {
            return res.status(400).send("Missing one of the required fields: title, imagelink, or content");
        }

        const blog = { title, imagelink, content, draft: false, date: Date.now() };
        const newBlog = await blogModel.create(blog);

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const { _id, title, imagelink, content } = req.body;
        if (!_id || !title || !imagelink || !content) {
            return res.status(400).send("Missing one of the required fields: id, title, imagelink, or content");
        }
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(400).send("Invalid ID format");
        }

        const updatedBlog = await blogModel.updateOne(
            { _id },
            { $set: { title, imagelink, content, date: Date.now() } }
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

exports.draftBlog = async (req, res) => {
    try {
        const { title, imagelink, content } = req.body;
        if (!title || !imagelink || !content) {
            return res.status(400).send("Missing one of the required fields: title, imagelink, or content");
        }

        const blog = { title, imagelink, content, draft: true, date: Date.now() };
        const newBlog = await blogModel.create(blog);

        res.status(200).json(newBlog);
    } catch (err) {
        res.status(500).send("Internal Server Error");
        console.log(err);
    }
}

