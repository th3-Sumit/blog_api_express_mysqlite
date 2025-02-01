require("dotenv").config();
const express = require("express");
const app = express();

const authRoutes = require("./Routes/authRoutes");
const blogRoutes = require("./Routes/blogRoutes");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
