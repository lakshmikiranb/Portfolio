const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", require("./routes/auth"));
app.use("/resume", require("./routes/resume"));

app.listen(5000, () => {
    console.log("Server running on port 5000");
});