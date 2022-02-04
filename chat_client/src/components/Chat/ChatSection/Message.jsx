import { Avatar, Box, Stack, Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/system';
import dayjs from 'dayjs';
import React from 'react';

const Message = ({ data, isCurrentUser = false, lastMessageSentTime }) => {
  const {
    text,
    createdAt,
    sender: { image, name },
  } = data;
  let showDate;
  if (dayjs().isSame(createdAt, 'day')) {
    showDate = dayjs(createdAt).format('h:mm A');
  } else {
    showDate = dayjs(createdAt).format('DD/MM/YYYY h:mm A');
  }
  let betweenTime = null;

  if (
    !lastMessageSentTime ||
    Math.abs(dayjs(lastMessageSentTime).diff(createdAt, 'hour', true)) >= 2
  ) {
    if (createdAt && dayjs(Date.now()).isSame(createdAt, 'day')) {
      betweenTime = dayjs(createdAt).format('h:mm A');
    } else {
      betweenTime = dayjs(createdAt).format('ddd, MMM D, YYYY h:mm A');
    }
  }

  return (
    <div>
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
      <Stack
        direction={'row'}
        spacing={1}
        justifyContent={isCurrentUser && 'flex-end'}
        my={2}>
        {!isCurrentUser && (
          //Don't work tooltip
          <Tooltip title={name} placement='right'>
            <Avatar src={image} />
          </Tooltip>
        )}
        <Tooltip title={showDate} placement={isCurrentUser ? 'left' : 'right'}>
          <MessageBox
            sx={
              isCurrentUser
                ? {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  }
                : {
                    backgroundColor: '#e4e6eb',
                  }
            }>
            {/* <SmallText
              fontSize={12}
              sx={{
                top: '-20px',
                left: 1,
                fontWeight: 'bold',
                marginLeft: isCurrentUser ? 'auto' : 'initial',
              }}>
              {sender?.name}
            </SmallText> */}
            <Typography>{text}</Typography>
          </MessageBox>
        </Tooltip>
      </Stack>
    </div>
  );
};

const MessageBox = styled('div')({
  // backgroundColor: '#ebebeb',
  padding: 10,
  width: 'fit-content',
  borderRadius: 10,
  position: 'relative',
  maxWidth: '50%',
});
const SmallText = styled('p')(({ theme, fontSize }) => ({
  position: 'absolute',
  fontSize: fontSize || 4,
}));
export default Message;
