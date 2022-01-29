import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Backdrop, ImageLayer, ImagePreview, ImageWrapper } from './styles';
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

export default AvatarUpload;
