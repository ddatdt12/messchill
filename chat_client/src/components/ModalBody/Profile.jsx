import { DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import EditProfile from './EditProfile';
import ProfileContent from './ProfileContent';
import ProfileTitle from './ProfileTitle';

const Profile = ({ onClose }) => {
  const [tab, setTab] = useState('Profile');

  return (
    <>
      <DialogTitle>
        <ProfileTitle title={tab} onClose={onClose} />
      </DialogTitle>
      <DialogContent dividers>
        {tab === 'Profile' && (
          <ProfileContent onEditProfileTab={() => setTab('Edit Profile')} />
        )}
        {tab === 'Edit Profile' && (
          <EditProfile
            onProfileTab={() => setTab('Profile')}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </>
  );
};

export default Profile;
