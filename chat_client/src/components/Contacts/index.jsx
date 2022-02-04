import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Box, IconButton, Typography } from '@mui/material';
import useModal from 'context/ModalContext';
import React from 'react';
import Contact from './Contact';

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
          contacts.map((c) => (
            <Contact
              user={c}
              key={c._id}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Contacts;
