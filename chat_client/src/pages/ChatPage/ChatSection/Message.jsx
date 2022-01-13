import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/system';
const Message = ({ info, isCurrentUser = false }) => {
  const { text, sender, timestamp } = info;
  return (
    <Container
      isCurrentUser={isCurrentUser}
      sx={
        isCurrentUser
          ? {
              marginLeft: 'auto',
            }
          : {}
      }>
      <SmallText
        fontSize={12}
        sx={{
          top: '-20px',
          left: 1,
          fontWeight: 'bold',
          marginLeft: isCurrentUser ? 'auto' : 'initial',
        }}>
        {sender}
      </SmallText>
      <Typography>{text}</Typography>
      {/* <SmallText sx={{ bottom: '-20px', width:'100%' }} fontSize={12}>
        {'12/05/2002, 12:05 AM'}
      </SmallText> */}
    </Container>
  );
};

const Container = styled('div')(({ isCurrentUser }) => ({
  // backgroundColor: '#ebebeb',
  padding: 10,
  width: 'fit-content',
  borderRadius: 10,
  backgroundColor: isCurrentUser ? '#bbdefb' : '#ebebeb',
  position: 'relative',
  marginBottom: 25,
}));
const SmallText = styled('p')(({ theme, fontSize }) => ({
  position: 'absolute',
  fontSize: fontSize || 4,
}));
export default Message;
