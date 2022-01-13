import { Logout, Settings } from '@mui/icons-material';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
} from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../context/AuthContext';
import MenuToolsButton from './MenuToolsButton';
import ConversationItem from './ConversationItem';
import SearchBar from './SearchBar';

import conversations from '../../../data/conversation';

const ConversationSideBar = ({ handleTabChange }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <Container>
      {/* Header  */}
      <Header>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Avatar
            sx={{
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          />
          <div>
            <IconButton
              aria-label='New message'
              onClick={() => navigate('/chat/new')}>
              <MessageIcon />
            </IconButton>
            <MenuToolsButton>
              <MenuItem>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem>
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
              <MenuItem onClick={() => logout(() => navigate('/login'))}>
                <ListItemIcon>
                  <Logout fontSize='small' />
                </ListItemIcon>
                Logout
              </MenuItem>
            </MenuToolsButton>
          </div>
        </Box>
        <SearchBar />
      </Header>
      <Box
        sx={{
          overflowY: 'scroll',
        }}>
        {conversations.map((con) => (
          <ConversationItem key={con._id} conversation={con} />
        ))}
      </Box>
    </Container>
  );
};

const Container = styled('div')(({ theme }) => ({
  flex: 3,
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  borderRight: `1px solid lightgray`,
}));

const Header = styled('div')({
  padding: 25,
});

export default ConversationSideBar;
