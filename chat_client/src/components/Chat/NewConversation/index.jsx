import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Box, IconButton, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';

import userApi from 'api/user';
import AsyncSearchInput from 'components/shared/AsyncSearchInput';
import useAuth from 'context/AuthContext';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import InputMessageForm from '../ChatSection/InputMessageForm';
import Message from '../ChatSection/Message';

const NewConversation = () => {
  const navigate = useNavigate();

  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const { socket } = useOutletContext();
  const [chatFriend, setChatFriend] = useState(null);
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    console.log('REF: ', messageEndRef);
  }, [messages]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    if (chatFriend) {
      socket.emit(
        'create_new_conversation',
        {
          sender: authState.user,
          friend: chatFriend,
        },
        ({ conversation, error }) => {
          if (!error) {
            console.log('receive_new_conversation_info: ', conversation);
            setConversation(conversation);
            if (conversation) {
              setMessages([...conversation.messages]);
            }
          }
        },
      );
    }

    setMessages([]);
  }, [authState.user, chatFriend, socket]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on('receive_new_conversation_info', ({ conversation, error }) => {});
    // socket.on('receive_message_to_new_conversation');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleMessageFormSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage || !chatFriend) return;

    setMessages((prev) => [
      ...prev,
      {
        _id: `${Math.random() * 100}`,
        text: inputMessage,
        sender: authState.user,
        // conversation,
      },
    ]);

    if (conversation) {
      socket.emit(
        'send_message',
        {
          text: inputMessage,
          sender: authState.user._id,
          conversation: conversation._id,
          memberIds: conversation.members,
        },
        () => {
          console.log('callback call!');
          navigate(`../${conversation._id}`);
        },
      );
    } else {
      socket.emit(
        'send_message_to_new_conversation',
        {
          newMessage: {
            text: inputMessage,
            sender: authState.user._id,
          },
          receiver: chatFriend._id,
        },
        (response) => {
          if (!response.error) {
            navigate(`../${response.conversation._id}`);
          } else {
            console.log(response.error);
          }
        },
      );
    }
    //When send message done
    setInputMessage('');
  };

  // const getUserFriends = useCallback(() => userApi.getUserFriends, []);
  return (
    <Container>
      <Header>
        <AsyncSearchInput
          label='Friend'
          value={chatFriend}
          setValue={(data) => {
            console.log(data);
            setChatFriend(data);
          }}
          asyncFunc={userApi.getUserFriends}
        />
      </Header>
      {loading && <LinearProgress />}
      <MessagesBody>
        {chatFriend &&
          (messages.length !== 0 ? (
            messages.map((m) => (
              <Message
                key={m._id}
                data={m}
                isCurrentUser={m.sender === authState.user._id}
              />
            ))
          ) : (
            <h1>No messages</h1>
          ))}
        <div ref={messageEndRef} />
      </MessagesBody>
      {chatFriend && (
        <Footer>
          <IconButton>
            <InsertEmoticonIcon color='primary' />
          </IconButton>

          <InputMessageForm
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            onSubmit={handleMessageFormSubmit}
          />

          <Box borderLeft={'1px solid lightgray'} mx={1}>
            <IconButton>
              <AttachFileIcon color='primary' />
            </IconButton>
            <IconButton>
              <AddPhotoAlternateIcon color='primary' />
            </IconButton>
          </Box>
        </Footer>
      )}
    </Container>
  );
};
const Container = styled('div')({
  flex: 7,
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
});
const Header = styled('div')({
  backgroundColor: 'white',
  display: 'flex',
  // justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  borderBottom: '1px solid lightgray',
  // boxShadow: '0 4px 2px -2px lightgray',
  zIndex: 1000,
});
// const Info = styled(Box)({
//   display: 'flex',
//   alignItems: 'center',
//   flex: 1,
//   '& p': {
//     color: 'gray',
//   },
// });
const MessagesBody = styled('div')({
  flex: 1,
  backgroundColor: 'white',
  padding: 20,
  overflowY: 'scroll',
});
const Footer = styled('div')({
  display: 'flex',
  backgroundColor: 'lightgray',
  padding: '10px 0',
});

export default NewConversation;
