import { DialogContent, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import ProfileTitle from 'components/Profile/ProfileTitle';
import React from 'react';
import SearchTextBox from '../SearchTextBox';

const PeopleModal = () => {
  return (
    <Box height={'70vh'}>
      <DialogTitle>
        <ProfileTitle title={'People'} />
      </DialogTitle>
      <DialogContent dividers>
        <SearchTextBox placeholder={'Search name'} />
      </DialogContent>
    </Box>
  );
};

export default PeopleModal;
