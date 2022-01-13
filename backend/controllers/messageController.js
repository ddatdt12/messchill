//@desc         Create new message
//@route        POST /api/posts
//@access       PRIVATE
exports.createMessage = catchAsync(async (req, res, next) => {
  const { participantIds, message } = req.body;

  if (message.trim() === '') {
    return next(new AppError('Message can not empty', 400));
  }

  if (participantIds.length === 0) {
    return next(new AppError('Conversations can not empty', 400));
  }

  const newConversation = await Conversation.create({
    participants: [...participantIds],
    lastMessage: message,
    lastSentTime: new Date(),
  });

  const newMessage = await Message.create({
    text: message,
    sender: req.user._id,
    conversationId: newConversation._id,
  });

  res.status(200).json({ ...newConversation, messages: [newMessage] });
});
