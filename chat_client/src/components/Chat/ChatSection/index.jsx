import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CallIcon from '@mui/icons-material/Call';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Avatar, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import useAuth from 'context/AuthContext';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import InfiniteScrollMessagesBox from './InfiniteScrollMessagesBox';
import InputMessageForm from './InputMessageForm';

const LIMIT = 10;
const ChatSection = () => {
  const {
    authState: { user: currentUser },
  } = useAuth();
  const { socket } = useOutletContext();
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  useEffect(() => {
    if (messages.length !== 0) {
    }
  }, [messages]);

  useEffect(() => {
    setMessages([]);
    if (!socket) return;
    setLoading(true);
    socket.emit(
      'join_conversation',
      conversationId,
      ({ conversation: conversationData, error }) => {
        setLoading(false);

        if (!error) {
          conversationData.receiver = conversationData.members.filter(
            (m) => m._id !== currentUser._id,
          )[0];
          setMessages([...conversationData.messages]);

          conversationData.messages = undefined;
          setConversation(conversationData);
          setHasMore(conversationData.numMessages > LIMIT);
        } else {
          setConversation(null);
          alert(error);
        }
      },
    );

    return () => {
      //leave last conversation before join new room
      console.log('Leave room:', conversationId);

      socket.emit('leave_conversation', conversationId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId, currentUser?._id, socket?.connected]);

  useEffect(() => {
    if (!socket) return;

    socket.on('receive_message', (message) => {
      setMessages((prev) => [message, ...prev]);
      // messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    });
  }, [socket]);

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
          setMessages((prev) => [
            { ...message, sender: { ...currentUser } },
            ...prev,
          ]);
          // messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        } else {
          alert(error);
        }
      },
    );

    setInputMessage('');
  };
  const fetchMoreMessages = () => {
    console.log('fetchMoreMessages');
    if (!socket) return;
    socket.emit(
      'get_more_messages',
      {
        conversationId,
        skip: messages.length,
        limit: LIMIT,
      },
      (res) => {
        console.log(res);
        if (!res.error) {
          setMessages((prev) => [...prev, ...res.messages]);

          setHasMore(res.hasMore ?? false);
        } else {
          alert(res.error);
        }
      },
    );
  };
  return (
    <>
      {}
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
        </Box>
      </Header>

      <InfiniteScrollMessagesBox
        loading={loading}
        messages={messages}
        hasMore={hasMore}
        fetchMoreMessages={fetchMoreMessages}
        currentUserId={currentUser._id}
      />
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
    </>
  );
};

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

const Footer = styled('div')({
  display: 'flex',
  backgroundColor: 'lightgray',
  padding: '10px 0',
});

export default ChatSection;
