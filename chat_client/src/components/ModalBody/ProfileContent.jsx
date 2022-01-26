import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import React from 'react';
const ProfileContent = ({ onEditProfileTab }) => {
  const bio = 'Đây là mai, mình rất tuyệt với về ...';
  const email = 'binzml1714@gmail.com';
  const name = 'Thanh Dat';
  return (
    <Box p={2}>
      <Stack spacing={2} direction='row' alignItems={'center'}>
        <Box mr={2}>
          <img
            src='https://picsum.photos/200/200'
            alt='avatar'
            style={{ borderRadius: '50%' }}
          />
        </Box>
        <Box>
          <Typography fontSize={24} fontWeight={'bold'}>
            {name}
          </Typography>
          <Box>
            <Title>Email</Title>
            <Description>{email}</Description>
          </Box>
          <Box>
            <Title fontWeight={'bold'}>Bio</Title>
            <Description mt={1}>
              <Typography>{bio}</Typography>
            </Description>
          </Box>
          <Box mt={2} spacing={2}>
            <Button
              variant={'lightgray'}
              startIcon={<EditIcon />}
              onClick={onEditProfileTab}>
              Edit profile
            </Button>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

const useStyles = makeStyles({});
const Title = styled(Box)({
  fontWeight: 'bold',
  fontSize: 20,
  margin: '16px 0 8px 0',
});
const Description = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
});
export default ProfileContent;
