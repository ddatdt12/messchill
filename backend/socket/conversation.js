const Conversation = require('../models/Conversation');
const mongoose = require('mongoose');
const Message = require('../models/Message');
const checkNewConversationExist = async (sender, receiver) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [sender._id, receiver._id], $size: 2 },
    })
      .lean()
      .populate('messages');
    if (conversation) {
      return { conversation, error: null };
    }

    return { conversation: null, error: null };
  } catch (error) {
    return { conversation: null, error: error.message };
  }
};
const createNewConversation = async (newMessage, senderId, receiverId) => {
  try {
    const lastMessage = {
      ...newMessage,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const conversation = await Conversation.create({
      members: [senderId, receiverId],
      lastMessage,
    });
    await Message.create({
      ...lastMessage,
      conversation: conversation._id,
    });

    const populatedConversation = await Conversation.populate(conversation, {
      path: 'members',
    });

    return { conversation: populatedConversation, error: null };
  } catch (error) {
    return { conversation: null, error: error.message };
  }
};

const getConversation = async (userId, conversationId) => {
  try {
    const conversation = await Conversation.findOne({
      members: userId,
      _id: conversationId,
    })
      .lean()
      .populate({
        path: 'messages',
        options: { sort: '-createdAt', limit: 20 },
      })
      .populate('members')
      .populate('numMessages');

    if (!conversation) {
      throw Error('Conversation not found');
    }
    conversation.messages.sort((m1, m2) => m1.createdAt - m2.createdAt);

    return { conversation, error: null };
  } catch (error) {
    return { conversation: null, error: error.message };
  }
};

module.exports = {
  checkNewConversationExist,
  createNewConversation,
  getConversation,
};
