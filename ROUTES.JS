const express = require("express");
const fs = require("fs");
const path = require("path");

const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/upload",
  upload.single("file"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        filename: req.file.filename,
        path: req.file.path,
        size: req.file.size
      }
    });
  }
);

router.get("/", (req, res) => {
  const uploadDir = path.join(__dirname, "../uploads");

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Unable to fetch files"
      });
    }

    res.json({
      success: true,
      files
    });
  });
});

router.get("/:filename", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../uploads",
    req.params.filename
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "File not found"
    });
  }

  res.download(filePath);
});


router.delete("/:filename", (req, res) => {
  const filePath = path.join(
    __dirname,
    "../uploads",
    req.params.filename
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: "File not found"
    });
  }

  fs.unlinkSync(filePath);

  res.json({
    success: true,
    message: "File deleted successfully"
  });
});

module.exports = router;
