import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CallIcon from '@mui/icons-material/Call';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Avatar, Box, IconButton, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import messagesData from '../../../data/messages';
import InputMessageForm from './InputMessageForm';
import Message from './Message';
import ScrollToBottom from 'react-scroll-to-bottom';

const currentUser = 'Dat DT';
const ChatSection = ({ socket, conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setMessages(messagesData);
  // }, []);

  // console.log(conversationId);
  // useEffect(() => {
  //   socket.on('receive_message', (message) => {
  //     setMessages((prev) => [...prev, message]);
  //     console.log(message);
  //   });
  // }, [socket]);

  const handleMessageFormSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage) return;

    setMessages((prev) => [
      ...prev,
      {
        _id: messages.length,
        text: inputMessage,
        sender: currentUser,
        timestamp: Date.now(),
        conversationId,
      },
    ]);
    //socket here
    setLoading(true);
    await socket.emit('send_message', {
      _id: messages.length,
      text: inputMessage,
      sender: currentUser,
      timestamp: Date.now(),
      conversationId,
    });
    //When send message done
    setLoading(false);
    setInputMessage('');
  };

  return (
    <Container>
      <Header>
        <Info>
          <Avatar sx={{ mr: 1 }} />
          <div>
            <h3>Đỗ Đạt</h3>
            <p>Active</p>
          </div>
        </Info>
        <Box display={'flex'} alignItems={'center'}>
          <IconButton>
            <MoreVertIcon color='primary' />
          </IconButton>
          <IconButton>
            <CallIcon color='primary' />
          </IconButton>
          <IconButton>
            <VideocamIcon color='primary' />
          </IconButton>
        </Box>
      </Header>
      {loading && <LinearProgress />}
      <MessagesBody>
        <ScrollToBottom>
          {messages.map((m) => (
            <Message
              key={m._id}
              info={{
                text: m.text,
                sender: m.sender,
                timestamp: m.timestamp,
              }}
              isCurrentUser={m.sender === currentUser}
            />
          ))}
        </ScrollToBottom>
      </MessagesBody>
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
  backgroundColor: 'lightgray',
  display: 'flex',
  // justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  borderBottom: '1px solid lightgray',
});
const Info = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  '& p': {
    color: 'gray',
  },
});
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

export default ChatSection;
