const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');

// Enable file upload middleware
router.use(fileUpload());

router.post("/", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // Grab the uploaded file
  let uploadedFile = req.files.file;

  // Attempt to parse the file as a PDF
  pdfParse(uploadedFile.data)
    .then(() => {
      res.send("File uploaded successfully!");
    })
    .catch((err) => {
      console.error(err);
      res.status(400).send("Invalid PDF file format.");
    });
});

module.exports = router;
