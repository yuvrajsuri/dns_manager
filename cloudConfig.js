const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

require('dotenv').config();

module.exports = {
  mongoURI: process.env.MONGODB_URI,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  jwtSecret: process.env.JWT_SECRET,
};

cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'trippy-DEV',
      allowedFormats: ["png","jpeg","jpg"], 
    },
  });

module.exports = {
    cloudinary,
    storage,
};
