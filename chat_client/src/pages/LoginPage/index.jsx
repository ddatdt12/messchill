import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { Box, Container, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthContext';
import LoginForm from './LoginForm';

const Login = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  
  const from = location.state?.from?.pathname || '/';

  if (auth.authState.user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (data) => {
    await auth.login(data, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.
      navigate(from, { replace: true });
    });
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Paper elevation={3} className={classes.sideBar}>
        <Welcome>Hi, Welcome Back</Welcome>
        <Box sx={{ lineHeight: 0, overflow: 'hidden', marginTop: 5 }}>
          <span className={classes.wrapper}>
            <img src='https://picsum.photos/500/500' alt='' />
          </span>
        </Box>
      </Paper>
      <Container maxWidth='sm' className={classes.mainContainer}>
        <Box
          sx={{
            maxWidth: '480px',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '100px',
            margin: '0 auto',
          }}>
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
          <LoginForm
            onSubmit={handleSubmit}
            loading={auth.authState?.loading}
          />
          {auth.authState.error ?? ''}
        </Box>
      </Container>
    </Box>
  );
};

const useStyles = makeStyles(() => {
  const theme = useTheme();
  return {
    sideBar: {
      backgroundColor: 'rgb(255, 255, 255)',
      backgroundImage: 'none',
      overflow: 'hidden',
      position: 'relative',
      borderRadius: '16px !important',
      zIndex: 0,
      width: '100%',
      maxWidth: theme.spacing(58),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '16px 0px 16px 16px',
    },
    wrapper: {
      width: '100%',
      height: '100%',
      backgroundSize: 'cover !important',
      filter: 'blur(0)',
      transition: 'filter .3s',
      '& > img': {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: 1,
        transition: 'opacity .3s',
      },
    },
    mainContainer: {
      width: '100%',
      marginLeft: 'auto',
      boxSizing: 'border-box',
      marginRight: 'auto',
      display: 'block',
      paddingLeft: '16px',
      paddingRight: '16px',
    },
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

const Welcome = styled('h3', {
  shouldForwardProp: (prop) => prop !== '',
})(({ theme }) => ({
  //Test việc truyền prop vào
  fontSize: '2rem',
  // display: IsShown ? 'block' : 'none',
  margin: '80px 0px 40px',
  fontWeight: '700',
  lineHeight: 1.5,
  fontSize: '2rem',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
}));

Login.propTypes = {};

export default Login;
