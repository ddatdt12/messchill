import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { Box, IconButton, LinearProgress } from '@mui/material';
import { styled } from '@mui/system';
import userApi from 'api/user';
import MultipleSelect from 'components/shared/MultipleSelect';
import useAuth from 'context/AuthContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import InfiniteScrollMessagesBox from '../ChatSection/InfiniteScrollMessagesBox';
import InputMessageForm from '../ChatSection/InputMessageForm';
import Message from '../ChatSection/Message';

const LIMIT = 10;

const NewConversation = () => {
  const navigate = useNavigate();

  const {
    authState: { user: currentUser },
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const { socket } = useOutletContext();
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    // messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    console.log('REF: ', messageEndRef);
  }, [messages]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    setMessages([]);

    if (selectedContacts.length !== 0) {
      socket.emit(
        'new_conversation',
        {
          sender: currentUser,
          contacts: selectedContacts,
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
  }, [currentUser, selectedContacts]);

  const handleMessageFormSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage || selectedContacts.length === 0) return;

    setMessages((prev) => [
      ...prev,
      {
        _id: `${Math.random() * 100}`,
        text: inputMessage,
        sender: currentUser._id,
        // conversation,
      },
    ]);

    if (conversation) {
      socket.emit(
        'send_message',
        {
          text: inputMessage,
          sender: currentUser._id,
          conversation: conversation._id,
          memberIds: conversation.members,
        },
        () => {
          navigate(`../${conversation._id}`);
        },
      );
    } else {
      console.log('send_message_to_new_conversation');
      socket.emit(
        'send_message_to_new_conversation',
        {
          newMessage: {
            text: inputMessage,
            sender: currentUser._id,
          },
          members: [currentUser, ...selectedContacts],
        },
        (response) => {
          if (!response.error) {
            navigate(`../${response.conversation._id}`);
          } else {
            alert(response.error);
          }
        },
      );
    }
    // When send message done
    setInputMessage('');
  };

  const getContacts = useCallback(async () => {
    try {
      const { data } = await userApi.getUserFriends();
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }, []);
  const handleChange = (data) => {
    setSelectedContacts(data);
  };

  const fetchMoreMessages = () => {
    console.log('fetchMoreMessages');
    if (!socket) return;
    socket.emit(
      'get_more_messages',
      {
        conversationId: conversation._id,
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
      <Header>
        <MultipleSelect
          label={'Contacts'}
          getOptionLabel={(contact) => contact.name}
          onChange={handleChange}
          asyncFunc={getContacts}
          filterOptions={(contacts, state) =>
            contacts.filter((c) => c._id !== state._id)
          }
        />
      </Header>
      <InfiniteScrollMessagesBox
        loading={loading}
        messages={messages}
        hasMore={hasMore}
        fetchMoreMessages={fetchMoreMessages}
        currentUserId={currentUser._id}
      />

      {selectedContacts.length !== 0 && (
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
