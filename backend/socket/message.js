const Conversation = require('../models/Conversation');
const mongoose = require('mongoose');
const Message = require('../models/Message');
const createNewMessage = async (newMessage) => {
  try {
    const latestMessage = {
      ...newMessage,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await Conversation.findByIdAndUpdate(newMessage.conversation, {
      latestMessage,
    });
    const message = await Message.create(newMessage);

    // Promise.all([
    //   User.find({ _id: req.body.userId }),
    //   User.find({ username: decodedUser.username})
    // ])
    // const id = new mongoose.Types.ObjectId();
    return { message, error: null };
  } catch (error) {
    return { message: null, error: error.message };
  }
};

const getMoreMessages = async ({ conversationId, skip, limit }) => {
  try {
    const messages = await Message.find({
      conversation: conversationId,
    })
      .lean()
      .sort('-createdAt')
      .skip(skip)
      .limit(limit)
      .populate('sender');
    const remainMessagesTotal =
      (await Message.countDocuments({
        conversation: conversationId,
      })) -
      (skip + limit);
    //Cần lấy những message gần nhất
    // messages.sort((m1, m2) => m1.createdAt - m2.createdAt);
    return {
      messages: messages,
      hasMore: remainMessagesTotal > 0,
      error: null,
    };
  } catch (error) {
    return { messages: null, error: error.message };
  }
};
module.exports = { createNewMessage, getMoreMessages };
