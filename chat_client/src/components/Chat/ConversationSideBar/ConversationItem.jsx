import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { makeStyles, styled } from '@mui/styles';

dayjs.extend(relativeTime);

const ConversationItem = ({ conversation, currentUser }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { members, lastMessage, createdAt } = conversation;
  const receiver = members.filter((m) => m._id !== currentUser._id)[0];
  const lastSentTime = dayjs(createdAt).fromNow(true);

  return (
    <Container onClick={() => navigate(`/chat/${conversation?._id}`)}>
      <Avatar sx={{ mr: 1 }} />
      <Box
        display='flex'
        justifyContent={'center'}
        flexDirection={'column'}
        flex={1}
        // width={'100%'}
        mb='auto'
        lineHeight={1.5}>
        <h3>{receiver?.name ?? 'Place holder'}</h3>
        <div>
          <Box display={'flex'} alignItems={'center'}>
            <span
              style={{
                width: 150,
              }}>
              <span
                style={{
                  // wordBreak: 'break-word',
                  marginRight: 10,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: 'block',
                  minWidth: 0,
                }}>
                {lastMessage.text}
              </span>
            </span>
            <Typography fontSize={1} variant='span' alignSelf={'center'}>
              {lastSentTime}
            </Typography>
          </Box>
        </div>
      </Box>
      <div>
        <div className={classes.square}></div>
      </div>
    </Container>
  );
};

ConversationItem.propTypes = {
  handleTabChange: PropTypes.func,
};
const useStyles = makeStyles({
  square: {
    width: 10,
    height: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  seen: {
    backgroundColor: 'red',
  },
});
const Container = styled('div')({
  display: 'flex',
  backgroundColor: 'white',
  alignItems: 'center',
  padding: '12px 24px',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: '#ebebeb',
  },
  maxWidth: '100%',
  minWidth: '100%',
});
export default ConversationItem;
