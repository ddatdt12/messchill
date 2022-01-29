import { DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import EditProfile from './EditProfile';
import ProfileContent from './ProfileContent';
import ProfileTitle from './ProfileTitle';
import useAuth from 'context/AuthContext';
const Profile = ({ onClose }) => {
  const [tab, setTab] = useState('Profile');
  const {
    authState: { user },
    updateUser,
  } = useAuth();

  return (
    <>
      <DialogTitle>
        <ProfileTitle title={tab} onClose={onClose} />
      </DialogTitle>
      <DialogContent dividers>
        {tab === 'Profile' && (
          <ProfileContent
            onEditProfileTab={() => setTab('Edit Profile')}
            user={user}
          />
        )}
        {tab === 'Edit Profile' && (
          <EditProfile
            onProfileTab={() => setTab('Profile')}
            user={user}
            updateProfile={updateUser}
          />
        )}
      </DialogContent>
    </>
  );
};

export default Profile;
