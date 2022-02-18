import { Box, Typography } from '@mui/material';
import NewGoogleAccountForm from 'components/Login/NewGoogleAccountForm';
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../context/AuthContext';

const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const from = location.state?.from?.pathname || '/';

  if (auth.authState?.user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (data) => {
    await auth.register(data, () => {
      navigate('/');
    });
  };

  return (
    <Box pb={2}>
      <Typography fontWeight={'bold'} fontSize={30}>
        Connect your google account
      </Typography>
      <NewGoogleAccountForm
        onSubmit={handleSubmit}
        loading={auth.authState?.isLoading}
        error={auth.authState?.error}
      />
    </Box>
  );
};

Login.propTypes = {};

export default Login;
