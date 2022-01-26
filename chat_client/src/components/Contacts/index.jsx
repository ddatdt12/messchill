import styled from '@emotion/styled';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Avatar, Badge, Box, IconButton, Typography } from '@mui/material';
import useModal from 'context/ModalContext';
import React from 'react';
const Contacts = ({ onBack, contacts }) => {
  const { setType } = useModal();

  return (
    <Box p={2}>
      <Box mb={2}>
        <Box
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Box display={'flex'} alignItems={'center'}>
            <IconButton onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>
            <Typography ml={1} variant='h6' fontWeight={'bold'}>
              People
            </Typography>
          </Box>
          <IconButton onClick={() => setType('people')}>
            <PersonAddAltIcon sx={{ color: 'black' }} />
          </IconButton>
        </Box>
        <Typography mt={1}>
          Active contacts ({contacts.filter((c) => c.isOnline).length})
        </Typography>
      </Box>
      <Box>
        {contacts &&
          contacts.length !== 0 &&
          contacts.map((c) => <Contact user={c} key={c._id} />)}
      </Box>
    </Box>
  );
};
const Contact = ({ user }) => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'start'} my={2}>
      <StyledBadge
        overlap='circular'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant='dot'
        isOnline={user.isOnline}>
        <Avatar alt='Remy Sharp' src={user.image} />
      </StyledBadge>
      <Typography fontSize={16} fontWeight={700} ml={2}>
        {user.name}
      </Typography>
    </Box>
  );
};

const StyledBadge = styled(Badge, {
  shouldForwardProp: (prop) => prop !== 'isOnline',
})(({ theme, isOnline }) => ({
  ...(isOnline && {
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }),
}));
export default Contacts;
