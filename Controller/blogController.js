const db = require("../db/db");

exports.createBlog = (req, res) => {
    const { title, content } = req.body;
    const userId = req.user.userId;

    const query = `INSERT INTO blogs (title, content, user_id) VALUES (?, ?, ?)`;
    db.run(query, [title, content, userId], function (err) {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ message: "Blog created successfully", blogId: this.lastID });
    });
};

exports.getUserBlogs = (req, res) => {
    const userId = req.user.userId;
    db.all(`SELECT * FROM blogs WHERE user_id = ?`, [userId], (err, blogs) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(blogs);
    });
};

exports.getAllBlogs = (req, res) => {
    db.all(`SELECT blogs.*, users.name AS author FROM blogs JOIN users ON blogs.user_id = users.id`, [], (err, blogs) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(blogs);
    });
};

exports.updateBlog = (req, res) => {
    const { title, content } = req.body;
    const blogId = req.params.id;
    const userId = req.user.userId;

    db.run(
        `UPDATE blogs SET title = ?, content = ? WHERE id = ? AND user_id = ?`,
        [title, content, blogId, userId],
        function (err) {
            if (err || this.changes === 0) return res.status(400).json({ error: "Failed to update blog" });
            res.json({ message: "Blog updated successfully" });
        }
    );
};

exports.deleteBlog = (req, res) => {
    const blogId = req.params.id;
    const userId = req.user.userId;

    db.run(`DELETE FROM blogs WHERE id = ? AND user_id = ?`, [blogId, userId], function (err) {
        if (err || this.changes === 0) return res.status(400).json({ error: "Failed to delete blog" });
        res.json({ message: "Blog deleted successfully" });
    });
};
