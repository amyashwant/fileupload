const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("file aa gyi >> ", file);

    const path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("path", path);

    file.mv(path, (err) => {
      console.log("error occured ", err);
    });

    res.status(200).json({
      success: true,
      message: "file uploaded successfully",
    });
  } catch (error) {
    console.log("error out>>", error);
  }
};

//_______________________________________________________________________________

function validator(type, tag) {
  return type.includes(tag);
}

async function cloudinaryUpdate(file, folder, quality) {
  if (quality) {
    return await cloudinary.uploader.upload(file.tempFilePath, {
      folder,
      resource_type: "auto",
      quality: quality,
    });
  }
  return await cloudinary.uploader.upload(file.tempFilePath, {
    folder,
    resource_type: "auto",
  });
}


exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(req.body);
    const file = req.files.imageFile;

    //validation
    const type = ["jpg", "jpeg", "png"];
    const tag = file.name.split(".")[1].toLowerCase();
    if (!validator(type, tag)) {
      return res.status(400).json({
        success: false,
        message: "file not supported",
      });
    }

    console.log("file>>", file);
    // const response = cloudinary.uploader.upload();
    const response = await cloudinaryUpdate(file, "firstdb");
    console.log("response>>", response);

    res.status(200).json({
      success: true,
      message: "file uploaded to cloudinary successfuly",
    });

    await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

//--------------------------------
exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(req.body);
    const file = req.files.videoFile;

    //validation
    const type = ["mp4", "mov"];
    const tag = file.name.split(".")[1].toLowerCase();
    if (!validator(type, tag)) {
      return res.status(400).json({
        success: false,
        message: "file not supported",
      });
    }

    console.log("file>>", file);
    // const response = cloudinary.uploader.upload();
    const response = await cloudinaryUpdate(file, "firstdb");
    console.log("response>>", response);

    res.status(200).json({
      success: true,
      message: "file uploaded to cloudinary successfuly",
    });

    await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};

//-----------------------------------
exports.imageReducer = async (req,res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(req.body);
    const file = req.files.imageFile;

    //validation
    const type = ["jpg", "jpeg", "png"];
    const tag = file.name.split(".")[1].toLowerCase();
    //you can filter here on the basis of size shown in file object
    if (!validator(type, tag)) {
      return res.status(400).json({
        success: false,
        message: "file not supported",
      });
    }

    console.log("file>>", file);
    // const response = cloudinary.uploader.upload();
    const response = await cloudinaryUpdate(file, "firstdb", 60);
    console.log("response>>", response);

    res.status(200).json({
      success: true,
      message: "file uploaded to cloudinary successfuly",
    });

    await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};
