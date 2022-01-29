import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import React from 'react';

const ProfileTitle = ({ title, onClose }) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}>
      <Typography fontSize={24} fontWeight={'bold'}>
        {title}
      </Typography>
      <IconButton
        aria-label='upload picture'
        onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default ProfileTitle;
