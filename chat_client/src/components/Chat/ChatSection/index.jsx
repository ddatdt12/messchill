import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CallIcon from '@mui/icons-material/Call';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import useAuth from 'context/AuthContext';
import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import InputMessageForm from './InputMessageForm';
import Message from './Message';
const ChatSection = () => {
  const {
    authState: { user: currentUser },
  } = useAuth();
  const { socket } = useOutletContext();
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const messageEndRef = useRef(null);
  const [conversation, setConversation] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (conversation) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  useEffect(() => {
    if (!socket) return;
    setLoading(true);
    socket.emit(
      'join_conversation',
      conversationId,
      ({ conversation: conversationData, error }) => {
        if (!error) {
          setLoading(false);
          conversationData.receiver = conversationData.members.filter(
            (m) => m._id !== currentUser._id,
          )[0];
          setMessages([...conversationData.messages]);

          conversationData.messages = undefined;
          setConversation(conversationData);
        } else {
          setConversation(null);
          alert(error);
        }
      },
    );
    //Just join conversation when user join another room, so don't need to listen socket changes
    console.log('After join', loading);

    return () => {
      //leave last conversation before join new room
      socket.emit('leave_conversation', conversationId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  const handleGetMoreMessage = () => {
    setLoading(true);
    socket.emit(
      'get_more_messages',
      {
        conversationId,
        page: page + 1,
        limit: 10,
      },
      (res) => {
        console.log(res);
        if (!res.error) {
          setMessages((prev) => [...res.messages, ...prev]);
          setLoading(false);
        } else {
          console.log(res);
        }
      },
    );
    setPage((page) => page + 1);
  };
  const handleMessageFormSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage || !socket) return;

    socket.emit(
      'send_message',
      {
        text: inputMessage,
        sender: currentUser._id,
        conversation: conversationId,
        memberIds: conversation.members.map((m) => m._id),
      },
      ({ message, error }) => {
        if (!error) {
          setMessages((prev) => [...prev, message]);
          messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
          console.log(error);
        }
      },
    );

    setInputMessage('');
  };

  return (
    <Container>
      <Header>
        <Info>
          <Avatar sx={{ mr: 1 }} />
          <div>
            <h3>{conversation?.receiver && conversation.receiver.name}</h3>
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
          <Button onClick={handleGetMoreMessage}>Load more </Button>
        </Box>
      </Header>
      {/* {loading && <LinearProgress />} */}
      <MessagesBody>
        {loading && (
          <CircularProgress
            style={{
              position: 'absolute',
              top: 10,
              left: '50%',
            }}
          />
        )}
        {messages &&
          messages.map((m, i) => (
            <Message
              key={m._id}
              data={m}
              isCurrentUser={m.sender === currentUser._id}
              lastMessageSentTime={i > 0 ? messages[i - 1].createdAt : null}
            />
          ))}
        <div ref={messageEndRef} />
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
  backgroundColor: 'white',
  display: 'flex',
  // justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  borderBottom: '1px solid lightgray',
  boxShadow: '0 0 4px rgba(0,0,0,0.2)',
  zIndex: 1000,
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
  position: 'relative',
});
const Footer = styled('div')({
  display: 'flex',
  backgroundColor: 'lightgray',
  padding: '10px 0',
});

export default ChatSection;
