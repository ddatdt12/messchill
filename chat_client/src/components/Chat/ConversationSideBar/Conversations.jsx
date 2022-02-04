import { Avatar, Box } from '@mui/material';
import SearchTextBox from 'components/shared/SearchTextBox';
import React from 'react';
import { useParams } from 'react-router-dom';
import ConversationItem from './ConversationItem';
import RightTopBar from './RightTopBar';

const Conversations = ({ conversations, currentUser, logout, setTab }) => {
  const { conversationId } = useParams();

  return (
    <>
      <Box p={3}>
        <Box display='flex' justifyContent='space-between'>
          <div>
            <Avatar
              src={currentUser?.image}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            />
            <h3>{currentUser.name}</h3>
          </div>
          <RightTopBar
            logout={logout}
            openActiveContacts={() => setTab('active')}
          />
        </Box>
        <SearchTextBox placeholder={'Search contacts'} />
      </Box>
      <Box
        flex={1}
        sx={{
          overflowY: 'auto',
        }}>
        {conversations &&
          conversations.map((con) => (
            <ConversationItem
              key={con._id}
              conversation={con}
              currentUser={currentUser}
              isCurrentConversation={conversationId === con._id}
            />
          ))}
      </Box>
    </>
  );
};

export default Conversations;
