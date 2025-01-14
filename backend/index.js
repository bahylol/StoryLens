require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./config/database.js");
const blogsRouter = require("./routes/blogs.js");

const app = express();

// Configure CORS options
const corsOptions = {
    origin: [process.env.FRONTEND], // Allow specific origins
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
};

// Enable CORS with the configured options
app.use(cors(corsOptions));

// Parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", blogsRouter);
app.get("/health", (req, res) => {
    res.send("Server is running up and healthy");
});

const PORT = process.env.PORT || 3000;

db.once("open", () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

db.on("error", (err) => {
    console.error("MongoDB error:", err);
});