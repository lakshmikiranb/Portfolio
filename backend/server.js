const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/auth", require("./routes/auth"));
app.use("/resume", require("./routes/resume"));

// IMPORTANT: use Render port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
