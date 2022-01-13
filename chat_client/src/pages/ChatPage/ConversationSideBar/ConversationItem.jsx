import { Avatar, Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const ConversationItem = ({ conversation }) => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`/chat/${conversation?._id}`)}>
      <Avatar sx={{ mr: 1 }} />
      <Box
        display='flex'
        justifyContent={'center'}
        flexDirection={'column'}
        // sx={{ maxWidth:'50%' }}
        flex={1}
        mb='auto'>
        <h3>Đỗ Đạt</h3>
        <div>
          <span
            style={{
              maxWidth: '70%',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'inline-block',
            }}>
            Lorem
          </span>
        </div>
        {/* <Box
            component='span'
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              display: 'inline-block',
            }}>
            Lorem Ipsum is simply dummy text
          </Box> */}
      </Box>
      <Typography mb={2.6} fontSize={1} width={'fit-content'}>
        52 minutes
      </Typography>
    </Container>
  );
};

ConversationItem.propTypes = {
  handleTabChange: PropTypes.func,
};

const Container = styled('div')({
  display: 'flex',
  backgroundColor: 'white',
  alignItems: 'center',
  padding: '12px 24px',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: '#ebebeb',
  },
});
export default ConversationItem;
