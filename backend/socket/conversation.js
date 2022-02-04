const Conversation = require('../models/Conversation');
const mongoose = require('mongoose');
const Message = require('../models/Message');
const checkNewConversationExist = async (sender, contacts) => {
  try {
    const conversation = await Conversation.findOne({
      members: {
        $all: [sender._id, ...contacts.map((c) => c._id)],
        $size: 1 + contacts.length,
      },
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
const createNewConversation = async (newMessage, members) => {
  try {
    const latestMessage = {
      ...newMessage,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const newConversation = {
      members: members.map((m) => m._id),
      latestMessage,
    };

    if (members.length > 2) {
      newConversation.type = 'Group';
      newConversation.conversationName = members
        .map((m) => {
          return m.name;
        })
        .join(', ');
    }
    const conversation = await Conversation.create(newConversation);
    await Message.create({
      ...latestMessage,
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
        options: { sort: '-createdAt', limit: 10 },
      })
      .populate('members')
      .populate('numMessages');

    if (!conversation) {
      throw Error('Conversation not found');
    }
    populateSenderOfMessage(conversation);
    // conversation.messages.sort((m1, m2) => m1.createdAt - m2.createdAt);

    return { conversation, error: null };
  } catch (error) {
    return { conversation: null, error: error.message };
  }
};

const populateSenderOfMessage = (conversation) => {
  const memberInfoMap = new Map(
    conversation.members.map((m) => [m._id.toString(), m]),
  );

  for (const mess of conversation.messages) {
    mess.sender = memberInfoMap.get(mess.sender.toString());
  }
  conversation.latestMessage.sender = memberInfoMap.get(
    conversation.latestMessage.sender.toString(),
  );
};
module.exports = {
  checkNewConversationExist,
  createNewConversation,
  getConversation,
};
