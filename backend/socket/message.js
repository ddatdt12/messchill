const Conversation = require('../models/Conversation');
const mongoose = require('mongoose');
const Message = require('../models/Message');
const createNewMessage = async (newMessage) => {
  try {
    const lastMessage = {
      ...newMessage,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    await Conversation.findByIdAndUpdate(newMessage.conversation, {
      lastMessage,
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

const getMoreMessages = async ({ conversationId, page, limit }) => {
  try {
    const messages = await Message.find({
      conversation: conversationId,
    })
      .lean()
      .sort('-createdAt')
      .skip(page * limit)
      .limit(limit);
    //Cần lấy những message gần nhất

    messages.sort((m1, m2) => m1.createdAt - m2.createdAt);
    return { messages: messages, error: null };
  } catch (error) {
    return { messages: null, error: error.message };
  }
};
module.exports = { createNewMessage, getMoreMessages };
