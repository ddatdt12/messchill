import { Container, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import ConversationSideBar from 'components/Chat/ConversationSideBar';
import useAuth from 'context/AuthContext';
import React, { useEffect, useState } from 'react';
import Modal from 'components/shared/Modal';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';
import { ModalProvider } from 'context/ModalContext';

const SOCKET_SERVER = 'http://localhost:5000';
const ChatPage = () => {
  const classes = useStyles();
  const {
    authState: { user },
    obj,
  } = useAuth();

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect_error', (err) => {
      console.log(err.message); // not authorized
    });
  }, [socket]);

  console.log('USER OUTSIDE:', user);
  useEffect(() => {
    console.log('User: ', user);
    if (user) {
      setSocket((prev) => {
        if (!prev)
          return io.connect(SOCKET_SERVER, { auth: { token: user._id } });
      });
    }
  }, [user]);


  return (
    <ModalProvider>
      <>{obj}</>
      <Container className={classes.container} sx={{ display: 'flex' }}>
        <Paper elevation={4} className={classes.chatWrapper}>
          <ConversationSideBar socket={socket} />

          <Outlet context={{ socket }} />
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
ChatPage.propTypes = {};

export default ChatPage;
