const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

//@desc         get all post of logged in user
//@route        POST /api/conversations
//@access       PRIVATE
exports.getConversationsByUser = catchAsync(async (req, res, next) => {
  const conversations = await Conversation.find({
    members: req.user._id,
  })
    .lean()
    .populate({
      path: 'members',
      match: { _id: { $ne: req.user._id } },
      // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
      // select: 'name -_id'
    })
    .sort({
      'latestMessage.createdAt': 'desc',
    });

  res.status(200).json(conversations);
});

//@desc         get all post of logged in user
//@route        POST /api/conversations/:id
//@access       PRIVATE
exports.getConversationDetails = catchAsync(async (req, res, next) => {
  const conversation = await Conversation.findOne({
    members: req.user._id,
    _id: req.params.id,
  })
    .lean()
    .populate();
  if (!conversation) {
    return next(new AppError('Conversation not found', 404));
  }

  res.status(200).json(conversation);
});

//@desc         Create new post
//@route        POST /api/posts
//@access       PRIVATE
exports.createConversation = catchAsync(async (req, res, next) => {
  const { participantIds, message } = req.body;

  if (message.trim() === '') {
    return next(new AppError('Message can not empty', 400));
  }

  if (participantIds.length === 0) {
    return next(new AppError('Conversations can not empty', 400));
  }

  const messageData = {};
  const newConversation = await Conversation.create({
    participants: [...participantIds],
    latestMessage: message,
    lastSentTime: new Date(),
  });

  console.log('Id', newConversation._id);
  const newMessage = await Message.create({
    text: message,
    sender: req.user._id,
    conversation: newConversation._id,
  });

  res.status(200).json({ ...newConversation, messages: [newMessage] });
});

//@desc         Update  post
//@route        POST /api/posts/:id
//@access       PRIVATE
exports.updatePost = catchAsync(async (req, res, next) => {
  const { url } = req.body;

  if (url?.trim() && !isValidUrl(url)) {
    return next(new AppError('Url is invalid', 400));
  }

  if (url.trim() && !url.startsWith('https'))
    req.body.url = `https://${url.trim()}`;

  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    return next(new AppError(`No post found with id ${req.params.id}`, 404));
  }

  if (updatedPost.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You do not have permission to update this post !', 403),
    );
  }

  res.status(200).json({
    success: true,
    post: updatedPost,
  });
});

//@desc         Delete  post
//@route        DELETE /api/posts/:id
//@access       PRIVATE
exports.deletePost = catchAsync(async (req, res, next) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);

  if (!deletedPost) {
    return next(new AppError(`Post not found with ${req.params.id} `));
  }

  if (deletedPost.user.toString() !== req.user._id.toString()) {
    return next(
      new AppError('You do not have permission to delete this post !', 403),
    );
  }

  res.status(200).json({
    success: true,
    data: {},
  });
});
