const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|gif|webp)$/)) {
      return cb(new Error("File must be a image"));
    }

    cb(undefined, true);
  },
});

module.exports = upload;
