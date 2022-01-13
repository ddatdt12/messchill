import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Avatar, Box, IconButton, LinearProgress, Paper } from '@mui/material';
import { styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import AsyncSearchInput from '../../../components/AsyncSearchInput';
const NewMessage = () => {
  const [loading, setLoading] = useState(false);
  // const { socket, conversationId } = useOutletContext();
  const [chatFriend, setChatFriend] = useState(null);
  // useEffect(() => {
  //   // setMessages(messagesData);
  // }, []);

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
        />
      </Header>
      {loading && <LinearProgress />}
      <MessagesBody>
        {/* <ScrollToBottom>
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
        </ScrollToBottom> */}
      </MessagesBody>
      {/* <Footer>
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
      </Footer> */}
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

export default NewMessage;
