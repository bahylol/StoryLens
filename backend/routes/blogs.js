const express = require("express");
const router = express.Router();

const { getAllBlogs, getAllDrafts, getBlog, createBlog, deleteBlog, updateBlog, reorderBlogs
} = require("../controller/blogs.js");

router.get("/getAllBlogs", getAllBlogs);
router.get("/getAllDrafts", getAllDrafts);
router.get("/blog/:id", getBlog);
router.post("/createBlog", createBlog);
router.put("/updateBlog", updateBlog);
router.delete("/deleteBlog", deleteBlog);
router.put("/reorderBlogs", reorderBlogs);


module.exports = router;

