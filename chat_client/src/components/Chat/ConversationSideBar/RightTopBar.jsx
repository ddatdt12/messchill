import { Logout, Settings } from '@mui/icons-material';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
} from '@mui/material';
import useModal from 'context/ModalContext';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuToolsButton from './MenuToolsButton';

const RightTopBar = ({ logout, openActiveContacts }) => {
  const navigate = useNavigate();
  const { setType } = useModal();
  return (
    <div>
      <IconButton
        aria-label='New message'
        onClick={() => navigate('/chat/new')}>
        <MessageIcon />
      </IconButton>
      <IconButton>
        <NotificationsIcon />
      </IconButton>
      <MenuToolsButton>
        <MenuItem onClick={() => setType('profile')}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={openActiveContacts}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          Contacts
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          onClick={() =>
            logout(() => {
              navigate('/authentication/login');
            })
          }>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </MenuToolsButton>
    </div>
  );
};

export default RightTopBar;
