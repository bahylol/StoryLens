const express = require("express");
const router = express.Router();

const { getAllBlogs, getBlog, createBlog, deleteBlog, updateBlog, draftBlog, reorderBlogs
} = require("../controller/blogs.js");

router.get("/getAllBlogs", getAllBlogs);
router.get("/blog/:id", getBlog);
router.post("/createBlog", createBlog);
router.put("/updateBlog", updateBlog);
router.delete("/deleteBlog", deleteBlog);
router.post("/draftBlog", draftBlog);
router.put("/reorderBlogs", reorderBlogs);


module.exports = router;

