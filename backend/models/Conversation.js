const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema(
  {
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    type: { type: String, enum: ['OneOne', 'Group'], default: 'OneOne' },
    conversationName: { type: String, default: null },
    conversationPhoto: {
      type: Object,
      default: null,
    },
    moreInfo: {
      type: Map,
      of: Object,
    },
    latestMessage: { type: Object, required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
    toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
  },
);

ConversationSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'conversation',
});
ConversationSchema.virtual('numMessages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'conversation',
  count: true,
});
module.exports = mongoose.model('Conversation', ConversationSchema);
