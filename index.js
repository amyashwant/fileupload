const express = require("express");
const app = express();
const Upload = require("./routes/fileUpload.js");
const { cloudinaryConnect } = require("./configuration/cloudinary.js");
cloudinaryConnect();

const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// const cookieParser = require("cookie-parser");
require("dotenv").config();

const { dbConnect } = require("./configuration/database");
dbConnect();

app.use(express.json());
// app.use(cookieParser());
const PORT = process.env.PORT || 5000;

app.use("/api/v1/upload", Upload);

app.listen(process.env.PORT, () => {
  console.log(`server at port ${PORT}`);
});
