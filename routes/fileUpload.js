const express = require("express");
const router = express.Router();

const {
  localFileUpload,
  imageUpload,
  videoUpload,
  imageReducer,
} = require("../controller/fileUpload");

router.post("/localfileupload", localFileUpload);
router.post("/imageupload", imageUpload);
router.post("/videoupload", videoUpload);
router.post("/imagereducer", imageReducer);
module.exports = router;
