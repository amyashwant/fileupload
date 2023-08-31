const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async (doc) => {
  try {
    console.log("DOC>>", doc);

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let sender = await transporter.sendMail({
      from: `firstdb- by yashwant`,
      to: doc.email,
      subject: "file uploaded on cloudinary",
      html: `<h1>you can view your file here:</h1><p><a href=${doc.imageUrl}>${doc.imageUrl}</a></p>`,
    });
    // html: `<h1>you can view your file here:</h1><p><a href=${doc.imageUrl}>${doc.imageUrl}</a></p>`
    console.log("sender>>", sender);
  } catch (error) {
    console.log(error);
  }
});

module.exports = mongoose.model("file", fileSchema);
