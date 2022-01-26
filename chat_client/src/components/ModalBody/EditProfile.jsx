import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Stack, TextField } from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import React, { useCallback, useEffect, useState } from 'react';
import userApi from 'api/user';
import AvatarUpload from './AvatarUpload';
const EditProfile = ({ onProfileTab, onClose }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const email = 'binzml1714@gmail.com';
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    image: null,
  });
  const { name, bio } = profile;
  // const [imageToResize, setImageToResize] = useState(undefined);
  // const [resizedImage, setResizedImage] = useState(undefined);
  useEffect(() => {
    setProfile({
      name: 'Thanh Dat',
      bio: 'Đây là mai, mình rất tuyệt với về ...',
    });
  }, []);

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
      const { data } = await userApi.updateProfile(formData);
      console.log(data);
    } catch (error) {
      console.log(error.response);
    }
    // revokeURLImage();
  };
  const handleCancel = () => {
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
            userAvatar={null}
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

        <Stack mt={2} spacing={2} direction={'row'}>
          <Button
            variant={'contained'}
            color='primary'
            startIcon={<SaveIcon />}
            onClick={handleSave}>
            Save
          </Button>
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
