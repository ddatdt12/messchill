import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { Box } from '@mui/material';
import { styled } from '@mui/styles';
import React from 'react';
import { useDropzone } from 'react-dropzone';
const AvatarUpload = ({
  userAvatar,
  previewImage,
  caption,
  sx,
  error,
  ...other
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    ...other,
  });
  return (
    <ImageWrapper mr={3} className='dropzone' {...getRootProps()}>
      <input type='file' accept='image/*' {...getInputProps()} />

      <ImageLayer>
        <img src={userAvatar ?? 'https://picsum.photos/200/200'} alt='avatar' />
      </ImageLayer>
      <ImagePreview>
        {previewImage && <img src={previewImage} alt='avatar' />}
      </ImagePreview>
      <Backdrop>
        <DriveFolderUploadIcon />
      </Backdrop>
    </ImageWrapper>
  );
};
const ImageWrapper = styled(Box)({
  minWidth: 200,
  width: 200,
  minHeight: 200,
  height: 200,
  position: 'relative',
});
const ImageLayer = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  '& img': {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
});
const ImagePreview = styled(ImageLayer)({});
const Backdrop = styled(ImageLayer)({
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiSvgIcon-root': {
    display: 'none',
    fontSize: 36,
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(1px)',
    '& .MuiSvgIcon-root': {
      display: 'block',
    },
    color: 'white',
    cursor: 'pointer',
  },
});
export default AvatarUpload;
