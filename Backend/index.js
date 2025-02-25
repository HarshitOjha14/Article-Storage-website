const express = require("express");
const app = express();
const userRoutes = require("./routes/User");
const articleRoutes = require("./routes/Article");
const profileRoutes = require("./routes/Profile");
const departmentRoutes = require("./routes/Department")
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require('cors')

dotenv.config();

const Port = process.env.PORT || 4000;

// Database connection
database.connect();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)


// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/article", articleRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/department", departmentRoutes);

// Root route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....',
    });
});

// Start server
app.listen(Port, () => {
    console.log(`App is running at ${Port}`);
});
