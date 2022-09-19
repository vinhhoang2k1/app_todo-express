const uploadFile = require("../middleware/upload.middleware");
const fs = require("fs")
const http = require('http')
const path = require('path')
const Image = require('../models/image.models')
const upload = async (req, res) => {
  try {
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    const newImage = new Image({
      name: `${Date.now()}${path.extname(req.file.originalname)}`,
      image: {
        data: fs.readFileSync('resources/static/assets/uploads' + req.file.filename),
        contentType: req.file.mimetype
      }
    })
    const data = await newImage.save()
    return res
      .status(200)
      .json({
        success: true,
        message: 'upload thanh cong',
        image: data
      })
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file ${err}`,
    });
  }
};
const getListFiles = (req, res) => {
  const directoryPath = __basedir + "resources/static/assets/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};
const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = "resources/static/assets/uploads/";
  console.log('aa', directoryPath);
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
const preview = async (req, res) => {
  const fileName = req.params.name;
  const data = await Image.findOne({ name: fileName })
  res.send(data.image.data)
}
module.exports = {
  upload,
  getListFiles,
  download,
  preview
};