const express = require("express");
const {
    createBlog,
    getUserBlogs,
    getAllBlogs,
    updateBlog,
    deleteBlog,
} = require("../Controller/blogController");
const authMiddleware = require("../Middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createBlog);
router.get("/user", authMiddleware, getUserBlogs);
router.get("/all", getAllBlogs);
router.put("/:id", authMiddleware, updateBlog);
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
