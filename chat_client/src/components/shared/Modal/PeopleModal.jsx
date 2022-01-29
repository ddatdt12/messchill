import { DialogContent, DialogTitle } from '@mui/material';
import { Box } from '@mui/system';
import Contacts from 'components/Contacts';
import ProfileTitle from 'components/Profile/ProfileTitle';
import React from 'react';
import CustomTabs from '../CustomTabs';
import SearchTextBox from '../SearchTextBox';
import TabPanel from '../TabPanel';

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
