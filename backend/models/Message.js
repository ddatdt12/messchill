const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
  {
    text: String,
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    IsSeen: {
      type: Boolean,
      default: false,
    },
    conversation: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Message', MessageSchema);
