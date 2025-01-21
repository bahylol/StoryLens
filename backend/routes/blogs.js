const express = require("express");
const router = express.Router();

const { getAllBlogs, getBlog, createBlog, deleteBlog, updateBlog, reorderBlogs, uploadImage
} = require("../controller/blogs.js");

router.get("/getAllBlogs", getAllBlogs);
router.get("/blog/:id", getBlog);
router.post("/createBlog", createBlog);
router.put("/updateBlog", updateBlog);
router.delete("/deleteBlog", deleteBlog);
router.put("/reorderBlogs", reorderBlogs);
router.post("/uploadImage", uploadImage);


module.exports = router;

