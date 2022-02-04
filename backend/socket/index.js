const {
  getConversation,
  checkNewConversationExist,
  createNewConversation,
} = require('./conversation');
const { createNewMessage, getMoreMessages } = require('./message');
const { getUserInfo, getContacts } = require('./user');

const activeUsers = new Map();

const executeSocket = (io) => {
  io.use((socket, next) => {
    if (socket.handshake.auth.token) {
      //Just simple authentication
      socket.userId = socket.handshake.auth.token;
      return next();
    }
    next(new Error('Please login to continue'));
  });

  io.on('connection', async (socket) => {
    console.log(`User connected: ${socket.userId}`);

    const { user, error } = await getUserInfo(socket.userId);
    if (user) {
      if (!activeUsers.has(user._id)) {
        activeUsers.set(user._id, { ...user, numbers: 1 });
      } else {
        activeUsers.get(user._id).numbers++;
      }
    }

    socket.join(socket.userId);

    socket.on('join_conversation', async (conversationId, callback) => {
      console.log(`User ${socket.id} join conversation: ${conversationId}`);
      const { conversation, error } = await getConversation(
        socket.userId,
        conversationId,
      );

      if (!error) {
        socket.join(conversationId);

        // for (let memId of conversation.members) {
        //   if (memId._id !== socket.userId) {
        //     socket.join(memId._id.toString());
        //   }
        // }
        console.log('Rooms after join: ', socket.rooms);
      }

      callback({
        conversation,
        error,
      });
    });

    socket.on('leave_conversation', async (conversationId) => {
      console.log('Rooms before leave: ', socket.rooms);

      socket.leave(conversationId);
      // const { conversation, error } = await getConversation(
      //   socket.userId,
      //   conversationId,
      // );

      // if (!error) {
      //   for (let memId of conversation.members) {
      //     if (memId._id !== socket.userId) {
      //       socket.leave(memId._id.toString());
      //     }
      //   }
      // }
    });

    socket.on('new_conversation', async ({ sender, contacts }, callback) => {
      console.log('Sender: ', sender, '\nContacts: ', contacts);
      const response = await checkNewConversationExist(sender, contacts);

      callback(response);
    });

    socket.on('send_message', async (data, callback) => {
      const { memberIds, ...messageData } = data;
      const { message, error } = await createNewMessage(messageData);
      if (!error) {
        socket.to(messageData.conversation).emit('receive_message', message);

        console.log(memberIds);
        //Send all member in rooms (have socket user) to update last message (in sidebar)
        memberIds.forEach((id) => {
          io.to(id).emit('update_last_message_of_conversation', message);
        });
      }
      callback({ message, error });
    });
    socket.on('send_message_to_old_conversation', async (data) => {
      const { memberIds, ...messageData } = data;
      const { message, error } = await createNewMessage(messageData);
      if (!error) {
        io.to(messageData.conversation).emit('receive_message', message);

        console.log(memberIds);
        //Send all member in rooms (have socket user) to update last message (in sidebar)
        memberIds.forEach((id) => {
          io.to(id).emit('update_last_message_of_conversation', message);
        });
      } else {
        socket.emit('send_message_error', error);
      }
    });

    socket.on(
      'send_message_to_new_conversation',
      async ({ newMessage, members }, callback) => {
        const res = await createNewConversation(newMessage, members);
        if (!res.error) {
          members.forEach((m) =>
            io.to(m._id).emit('get_new_conversation', res.conversation),
          );
        }

        // callback is function defined in frond end
        callback(res);
      },
    );

    socket.on(
      'get_more_messages',
      async ({ conversationId, skip, limit }, callback) => {
        const res = await getMoreMessages({ conversationId, skip, limit });
        
        callback(res);
      },
    );

    socket.on('get_active_users', async (userId, callback) => {
      const { contacts, error } = await getContacts(userId);
      if (error) {
        return callback({ error });
      }
      const activeContactsId = Array.from(activeUsers.keys()).filter(
        (user) => user._id !== socket.userId,
      );

      const statusContacts = contacts.map((c) => {
        if (activeContactsId.indexOf(c._id.toString()) !== -1) {
          return { ...c, isOnline: true };
        }
        return { ...c, isOnline: false };
      });

      sort(statusContacts);

      callback({ contacts: statusContacts, error });
    });
    socket.on('offline', (data) => {
      socket.disconnect();
    });
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id} - ${socket.userId}`);

      if (activeUsers.get(socket.userId)) {
        const numbers = --activeUsers.get(socket.userId).numbers;
        if (numbers <= 0) {
          activeUsers.delete(socket.userId);
        }
      }
    });
  });
};

const sort = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (!array[i].isOnline && array[j].isOnline) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  }
};
module.exports = executeSocket;
