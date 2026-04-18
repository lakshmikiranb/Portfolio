const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const path = require("path");

const router = express.Router();

/* AUTH CHECK */
function verify(req, res, next) {
    const token = req.headers.authorization;

    if (!token) return res.status(403).send("No token");

    jwt.verify(token, "SECRET", (err) => {
        if (err) return res.status(403).send("Invalid token");
        next();
    });
}

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: "backend/uploads/",
    filename: (req, file, cb) => {
        cb(null, "resume.pdf");
    }
});

const upload = multer({ storage });

/* UPLOAD RESUME (ADMIN ONLY) */
router.post("/upload", verify, upload.single("resume"), (req, res) => {
    res.json({ message: "Resume uploaded" });
});

/* GET RESUME */
router.get("/", (req, res) => {
    res.json({
        url: "http://localhost:5000/uploads/resume.pdf"
    });
});

module.exports = router;