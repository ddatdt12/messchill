const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

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
  const friends = await User.find({});

  console.log(friends);
  res.status(200).json(friends);
});
