const util = require("util");
const multer = require("multer");
const path = require("path");
const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/static/assets/uploads');
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`
        console.log('date',Date.now());
        cb(null, fileName);
    },
});
let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("image");
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
