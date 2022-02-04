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
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [conversation, setConversation] = useState(null);

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
          sender: authState.user,
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
    console.log(selectedContacts);
  }, [authState.user, selectedContacts]);

  const handleMessageFormSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage || selectedContacts.length === 0) return;

    setMessages((prev) => [
      ...prev,
      {
        _id: `${Math.random() * 100}`,
        text: inputMessage,
        sender: authState.user._id,
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
          members: [authState.user, ...selectedContacts],
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
      {loading && <LinearProgress />}
      <MessagesBody>
        {selectedContacts.length !== 0 &&
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
