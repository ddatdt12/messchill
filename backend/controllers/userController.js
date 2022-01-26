const { storageBucket } = require('../config/firebase');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const { uploadImage } = require('../utils/uploadImage');
const format = require('util');

const { v4: uuidv4 } = require('uuid');
const AppError = require('../utils/AppError');
//@desc         get user information
//@route        GET /api/users/me
//@access       PRIVATE
exports.getUserInfo = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json(user);
});

//@desc         get all post of logged in user
//@route        POST /api/users/me/friends
//@access       PRIVATE
exports.getUserFriends = catchAsync(async (req, res, next) => {
  // const conversations = await User.findById(req.user._id).populate('friends');

  //fake friends
  const friends = await User.find({ _id: { $ne: req.user._id } });

  res.status(200).json(friends);
});
//@desc         get all post of logged in user
//@route        PUT /api/users/me/profile
//@access       PRIVATE
exports.updateProfile = catchAsync(async (req, res, next) => {
  console.log('file:', req.file);
  console.log('Body:', req.body);
  // uploadImage('images', req.file.originalName, req.file);
  const updatedQuery = { ...req.body };
  try {
    if (req.file?.fieldname === 'avatar') {
      const url = await uploadImageToStorage(req.file);
      updatedQuery.image = url;
    }
  } catch (error) {
    return next(new AppError('Something went wrong when updating avatar', 400));
  }
  const user = await User.findByIdAndUpdate(req.user._id, updatedQuery, {
    new: true,
    runValidators: true,
  });

  //fake friends

  res.status(200).json({ user });
});

const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    const uuidRandom = uuidv4();
    const newFileName = uuidRandom;

    const fileUpload = storageBucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        destination: `avatars/${newFileName}`,
        metadata: {
          firebaseStorageDownloadTokens: uuidRandom,
        },
      },
    });

    blobStream.on('error', (error) => {
      reject(error);
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      // const url = `https://storage.googleapis.com/${storageBucket.name}/${fileUpload.name}`;
      // resolve(url);
      resolve(
        'https://firebasestorage.googleapis.com/v0/b/' +
          storageBucket.name +
          '/o/' +
          encodeURIComponent(fileUpload.name) +
          '?alt=media&token=' +
          uuidRandom,
      );
    });

    blobStream.end(file.buffer);
  });
};
