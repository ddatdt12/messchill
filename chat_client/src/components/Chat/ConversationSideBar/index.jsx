import { styled } from '@mui/system';
import conversationAPI from 'api/conversation';
import Contacts from 'components/Contacts';
import React, { useEffect, useState } from 'react';
import useAuth from 'context/AuthContext';
import Conversations from './Conversations';

const ConversationSideBar = ({ socket }) => {
  const {
    authState: { user: currentUser },
    logout,
  } = useAuth();
  const [conversations, setConversations] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [tab, setTab] = useState('conversation');

  useEffect(() => {
    if (tab === 'conversation') {
      (async () => {
        try {
          const res = await conversationAPI.getConversationList();
          setConversations([...res.data]);
        } catch (error) {
          console.log(error);
        }
      })();
    } else if (tab === 'active') {
      socket.emit(
        'get_active_users',
        currentUser._id,
        ({ error, contacts }) => {
          if (!error) setContacts(contacts);
        },
      );
    }
  }, [tab]);

  useEffect(() => {
    if (!socket) return;

    //Cân nhắc tối ưu khúc này
    socket.on('update_last_message_of_conversation', (message) => {
      console.log(message);
      setConversations((prevCon) => {
        const conversationTemp = [...prevCon];
        const index = prevCon.findIndex(
          (con) => con._id === message.conversation,
        );

        if (index === -1) return conversationTemp;

        const [removed] = conversationTemp.splice(index, 1);
        removed.lastMessage = message;
        conversationTemp.unshift(removed);
        return conversationTemp;
      });
    });
    socket.on('get_new_conversation', (conversation) => {
      setConversations((prev) => [conversation, ...prev]);
    });
  }, [socket]);

  const handleLogout = (callback) => {
    logout(callback);
    socket.emit('offline', currentUser)
  };
  return (
    <Container>
      {/* Header  */}
      {tab !== 'active' && (
        <Conversations
          conversations={conversations}
          currentUser={currentUser}
          logout={handleLogout}
          setTab={setTab}
        />
      )}

      {tab === 'active' && (
        <Contacts onBack={() => setTab('conversation')} contacts={contacts} />
      )}
    </Container>
  );
};

const Container = styled('div')(({ theme }) => ({
  flex: 3,
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid lightgray`,
  maxWidth: '30%',
}));

export default ConversationSideBar;
