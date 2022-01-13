import { Container, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';
import ConversationSideBar from './ConversationSideBar';

const socket = io.connect('http://localhost:5000');
const conversationId = 'zxczx123123';
const ChatPage = (props) => {
  const classes = useStyles();

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io.connect('http://localhost:5000');
    socketRef.current.emit('join_conversation', conversationId);
    return () => { socket.current?.disconnect(); };
  }, []);

  // useEffect(() => {
  //   socket.emit('join_conversation', conversationId);
  // }, []);

  return (
    <Container className={classes.container} sx={{ display: 'flex' }}>
      <Paper elevation={4} className={classes.chatWrapper}>
        <ConversationSideBar />

        <Outlet context={{ socket, conversationId }} />
      </Paper>
    </Container>
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
    height: '90vh',
    width: '100%',
    display: 'flex',
  },
});
ChatPage.propTypes = {};

export default ChatPage;
