import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/styles';
import userApi from 'api/user';
import ButtonLoading from 'components/ButtonLoading';
import React, { useCallback, useEffect, useState } from 'react';
import AvatarUpload from './AvatarUpload';
const EditProfile = ({ onProfileTab, user, updateProfile }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const email = 'binzml1714@gmail.com';
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    imageUrl: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const { name, bio, imageUrl } = profile;

  useEffect(() => {
    setProfile({ name: user.name, bio: user.bio, imageUrl: user.image });
  }, [user]);

  const handleDropImage = (acceptedFiles) => {
    console.log(acceptedFiles);
    if (!acceptedFiles[0]) return;

    const previewUrl = URL.createObjectURL(acceptedFiles[0]);
    setProfile((prev) => ({ ...prev, image: acceptedFiles[0] }));
    setPreviewImage(previewUrl);
  };

  const handleProfileChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSave = async () => {
    console.log(profile);
    if (!profile.name || !profile.bio) {
      alert('Wrong!');
      return;
    }
    try {
      const formData = new FormData();
      if (profile.image) {
        console.log(profile.image);
        formData.append('avatar', profile.image);
      }
      formData.append('name', name);
      formData.append('bio', bio);
      setLoading(true);
      const { data } = await userApi.updateProfile(formData);
      updateProfile(data.user);
      setLoading(false);
      revokeURLImage();
      onProfileTab();
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleCancel = () => {
    onProfileTab();
    revokeURLImage();
  };
  const revokeURLImage = useCallback(() => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
    }
  }, [previewImage]);

  return (
    <Box p={2}>
      <Stack spacing={2}>
        <Stack direction={'row'}>
          <AvatarUpload
            accept='image/*'
            maxSize={3145728}
            previewImage={previewImage}
            userAvatar={imageUrl}
            onDrop={handleDropImage}
          />
          <Box>
            <Title>Name</Title>
            <TextField
              id='outlined-name'
              value={name}
              name='name'
              onChange={handleProfileChange}
              sx={{ width: '100%' }}
            />
          </Box>
        </Stack>

        <Box>
          <Title>Bio</Title>
          <TextField
            id='outlined-multiline-static'
            multiline
            rows={4}
            name='bio'
            value={bio}
            onChange={handleProfileChange}
            sx={{ width: '100%' }}
          />
        </Box>

        <Stack mt={2} spacing={2} direction={'row'} justifyContent={'flex-end'}>
          <ButtonLoading
            variant={'contained'}
            color='primary'
            startIcon={<SaveIcon />}
            onClick={handleSave}
            text={'Save'}
            loading={loading}
          />
          <Button
            variant={'lightgray'}
            startIcon={<CancelIcon />}
            onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

const Title = styled(Box)({
  fontWeight: 'bold',
  fontSize: 20,
  marginBottom: 8,
});

export default EditProfile;
