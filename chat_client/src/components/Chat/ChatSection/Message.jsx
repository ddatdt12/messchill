import { Box, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import React from 'react';

const Message = ({ data, isCurrentUser = false, lastMessageSentTime }) => {
  const { text, sender, createdAt } = data;
  let showDate;
  if (dayjs().isSame(createdAt, 'day')) {
    showDate = dayjs(createdAt).format('h:mm A');
  } else {
    showDate = dayjs(createdAt).format('DD/MM/YYYY h:mm A');
  }

  let betweenTime = null;

  if (
    !lastMessageSentTime ||
    dayjs(createdAt).diff(lastMessageSentTime, 'h') >= 2
  ) {
    if (createdAt && dayjs(Date.now()).isSame(createdAt, 'day')) {
      betweenTime = dayjs(createdAt).format('h:mm A');
    } else {
      betweenTime = dayjs(createdAt).format('ddd, MMM D, YYYY h:mm A');
    }
  }

  return (
    <>
      {betweenTime && (
        <Box
          display={'flex'}
          flex={1}
          justifyContent={'center'}
          my={2}
          sx={{
            color: 'common.placeHolderText',
            fontSize: 10,
            fontWeight: 600,
          }}>
          {betweenTime}
        </Box>
      )}
      <Tooltip title={showDate} placement={isCurrentUser ? 'left' : 'right'}>
        <Container
          sx={
            isCurrentUser
              ? {
                  marginLeft: 'auto',
                  backgroundColor: 'primary.main',
                  color: 'white',
                }
              : {
                  backgroundColor: '#e4e6eb',
                }
          }>
          <SmallText
            fontSize={12}
            sx={{
              top: '-20px',
              left: 1,
              fontWeight: 'bold',
              marginLeft: isCurrentUser ? 'auto' : 'initial',
            }}>
            {sender?.name}
          </SmallText>
          <Typography>{text}</Typography>
        </Container>
      </Tooltip>
    </>
  );
};

const Container = styled('div')({
  // backgroundColor: '#ebebeb',
  padding: 10,
  width: 'fit-content',
  borderRadius: 10,
  position: 'relative',
  marginBottom: 15,
  maxWidth: '50%',
});
const SmallText = styled('p')(({ theme, fontSize }) => ({
  position: 'absolute',
  fontSize: fontSize || 4,
}));
export default Message;
