const mongoose = require('mongoose');
const User = require('../models/User');
const getUserInfo = async (userId) => {
  try {
    const user = await User.findById(userId).lean();
    return { user: { ...user, _id: user._id.toString() }, error: null };
  } catch (error) {
    return { user: null, error };
  }
};
const getContacts = async (userId) => {
  try {
    const users = await User.find({ _id: { $ne: userId } }).lean();
    return { contacts: users, error: null };
  } catch (error) {
    return { contacts: null, error };
  }
};

module.exports = { getUserInfo, getContacts };
