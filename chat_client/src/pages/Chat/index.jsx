import { Container, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ConversationSideBar from 'components/Chat/ConversationSideBar';
import useAuth from 'context/AuthContext';
import React, { useEffect, useState } from 'react';
import Modal from 'components/shared/Modal';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';
import { ModalProvider } from 'context/ModalContext';
import { styled } from '@mui/system';

const SOCKET_SERVER = 'http://localhost:5000';
const ChatPage = () => {
  const classes = useStyles();
  const {
    authState: { user },
  } = useAuth();

  const [socket, setSocket] = useState(
    io.connect(SOCKET_SERVER, { auth: { token: user._id } }),
  );
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect_error', (err) => {
      console.log(err.message); // not authorized
    });
  }, [socket]);

  useEffect(() => {
    if (user?._id) {
      setSocket(io.connect(SOCKET_SERVER, { auth: { token: user._id } }));
      console.log('Connect');
    }
  }, [user?._id]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connect');
      setConnected(true);
    });
  }, [socket]);

  console.log('Parent>', socket);
  return (
    <ModalProvider>
      <Container className={classes.container} sx={{ display: 'flex' }}>
        <Paper elevation={4} className={classes.chatWrapper}>
          <ConversationSideBar socket={socket} />
          <ChatBody>
            {connected ? <Outlet context={{ socket }} /> : 'Loading'}
          </ChatBody>
        </Paper>
      </Container>
      <Modal />
    </ModalProvider>
  );
};

const useStyles = makeStyles({
  container: {
    backgroundColor: 'rgb(255, 255, 255)',
    padding: 30,
    alignItems: 'center',
    height: '100vh',
  },
  chatWrapper: {
    height: '100%',
    width: '100%',
    display: 'flex',
  },
});

const ChatBody = styled('div')({
  flex: 7,
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
});
ChatPage.propTypes = {};

export default ChatPage;
