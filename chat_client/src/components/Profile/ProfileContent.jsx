import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Stack, Typography } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import React from 'react';
import { ImageLayer, ImageWrapper } from './styles';
const ProfileContent = ({ onEditProfileTab, user }) => {
  const { email, name, bio, image } = user ?? {};
  return (
    <Box p={2}>
      <Stack spacing={2} direction='row' alignItems={'center'}>
        <Image>
          <img src={image} alt='avatar' />
        </Image>
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
const Image = styled(Box)({
  minWidth: 200,
  width: 200,
  minHeight: 200,
  height: 200,
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  }
});
const Description = styled(Typography)({
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
});
export default ProfileContent;
