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
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import useAuth from 'context/AuthContext';
import React, { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useOutletContext, useParams } from 'react-router-dom';
import InputMessageForm from './InputMessageForm';
import Message from './Message';

const LIMIT = 10;
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

  const [loadMoreOption, setLoadMoreOption] = useState({
    messagesLength: 0,
    hasMore: false,
  });

  const { messagesLength, hasMore } = loadMoreOption;
  console.log('loadMoreOption: ', loadMoreOption);
  useEffect(() => {
    if (conversation) {
      // messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

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
          setLoadMoreOption({
            messagesLength: conversationData.numMessages,
            hasMore: conversationData.numMessages > LIMIT,
          });
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
      setMessages((prev) => [...prev, message]);
      console.log('Receive message');
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
          setMessages((prev) => [...prev, message]);
          messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
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

          setLoadMoreOption((prev) => ({
            ...prev,
            hasMore: res.hasMore ?? false,
          }));
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
      {/* {loading && <LinearProgress />} */}
      <MessagesBody id='scrollableDiv'>
        {/*Put the scroll bar always on the bottom*/}
        {messages.length !== 0 && (
          <InfiniteScroll
            dataLength={messages.length}
            next={fetchMoreMessages}
            style={{
              display: 'flex',
              flexDirection: 'column-reverse',
              position: 'relative',
            }} //To put endMessage and loader to the top.
            hasMore={hasMore}
            inverse={true} 
            loader={
              <CircularProgress
                style={{
                  position: 'absolute',
                  top: 10,
                  left: '50%',
                }}
              />
            }
            endMessage={<h3>No more</h3>}
            scrollableTarget='scrollableDiv'>
            {messages.map((m, i) => (
              <Message
                key={m._id}
                data={m}
                isCurrentUser={m.sender._id === currentUser._id}
                lastMessageSentTime={i > 0 ? messages[i - 1].createdAt : null}
              />
            ))}
          </InfiniteScroll>
        )}
        {/* <div ref={messageEndRef} /> */}
      </MessagesBody>
      {/* <MessagesBody>
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
              isCurrentUser={m.sender._id === currentUser._id}
              lastMessageSentTime={i > 0 ? messages[i - 1].createdAt : null}
            />
          ))}
        <div ref={messageEndRef} />
      </MessagesBody> */}
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
const MessagesBody = styled('div')({
  flex: 1,
  backgroundColor: 'white',
  padding: 20,
  overflowY: 'scroll',
  overflowX: 'hidden',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column-reverse',
});
const Footer = styled('div')({
  display: 'flex',
  backgroundColor: 'lightgray',
  padding: '10px 0',
});

export default ChatSection;
