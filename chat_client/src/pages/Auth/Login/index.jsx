import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { makeStyles } from '@mui/styles';
import LoginForm from 'components/Auth/LoginForm';
import TopTitle from 'components/Auth/TopTitle';
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../context/AuthContext';

const Login = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const { authState, login } = useAuth();

  const from = location.state?.from?.pathname || '/';

  if (authState.user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (data) => {
    await login(data, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.
      navigate(from, { replace: true });
    });
  };

  return (
    <>
      <TopTitle />
      <LoginForm
        onSubmit={handleSubmit}
        loading={authState?.isLoading}
        error={authState?.error}
      />
    </>
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
