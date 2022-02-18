import { Box,  Typography } from '@mui/material';
import {  makeStyles } from '@mui/styles';
import React from 'react';

const TopTitle = () => {
  const classes = useStyles();
  return (
    <div className={classes.titleWrapper}>
      <div>
        <Typography
          variant='h4'
          sx={{
            margin: '0px 0px 8px',
            fontWeight: '700',
            lineHeight: '1.5',
            fontSize: '1.5rem',
          }}>
          Sign in to Taskmal
        </Typography>
        <Typography variant='body1' className={classes.description}>
          Enter your details below.
        </Typography>
      </div>
      <Box>
        <img
          src='https://minimal-assets-api.vercel.app/assets/icons/auth/ic_firebase.png'
          alt='banner'
        />
      </Box>
    </div>
  );
};

const useStyles = makeStyles(() => {
  return {
    titleWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: '"Public Sans", sans-serif',
      '& img': {
        width: '32px',
        height: '32px',
      },
    },
    description: {
      margin: 0,
      lineHeight: 1.5,
      fontSize: '1rem',
      fontFamily: '"Public Sans", sans-serif',
      fontWeight: 400,
      color: 'rgb(99, 115, 129)',
    },
  };
});
export default TopTitle;
