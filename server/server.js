// This code sets up a server that listens for POST requests at /upload. When it receives a file, it will respond with a success message. 
// Note that file uploads will be handled by express-fileupload
// Run 'npm install express-fileupload' to install.

const cors = require('cors');
const express = require('express');
const uploadRoute = require('./upload.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/upload', uploadRoute);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

// const router = express.Router();
// const fileUpload = require('express-fileupload');
// const pdfParse = require('pdf-parse');

// // Enable file upload middleware
// router.use(fileUpload());

// router.post("/", (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send("No files were uploaded.");
//   }

//   // Grab the uploaded file
//   let uploadedFile = req.files.file;

//   // Attempt to parse the file as a PDF
//   pdfParse(uploadedFile.data)
//     .then(() => {
//       res.send("File uploaded successfully!");
//     })
//     .catch(err => {
//       const errorMessage = err.message;
//       res.status(400).send(`Uploaded file is not a valid PDF. Error: ${errorMessage}`);
//     });
// });

// module.exports = router;
