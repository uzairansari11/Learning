const express = require("express");
const multer = require("multer");

const app = express();

/* This is basically where to store file */
const storage = multer.diskStorage({
  destination: "./upload",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    // Allowed mime types
    const allowedTypes = ["image/jpeg", "image/png"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only JPEG and PNG files are allowed"));
    }
  },
});

app.post("/uploads", (req, res) => {
  upload.array("photos", 5)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).send("Multer error: " + err.message);
    } else if (err) {
      return res.status(400).send("Upload failed: " + err.message);
    }

    const uploadedFilenames = req.files.map((file) => file.filename);
    res.send(`Successfully uploaded: ${uploadedFilenames.join(", ")}`);
  });
});

app.listen(8000, () => {
  console.log("server running ");
});
