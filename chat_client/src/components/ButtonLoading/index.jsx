import { Box, Button, CircularProgress } from '@mui/material';
import React from 'react';

const ButtonLoading = ({ loading, children, text, startIcon, ...other }) => {
  return (
    <Button
      {...other}
      disabled={loading}
      startIcon={loading ? <CircularProgress size={16} /> : startIcon}>
      {text}
    </Button>
  );
};

export default ButtonLoading;
