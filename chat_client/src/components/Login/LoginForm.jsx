import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import FacebookLogo from 'assets/images/facebook_logo.png';
import InputForm from 'components/shared/InputForm';
import { auth, facebookProvider, googleProvider } from 'config/firebase';
import useAuth from 'context/AuthContext';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
// import GoogleLogin from 'react-google-login';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const LoginForm = ({ onSubmit, loading, error }) => {
  const navigate = useNavigate();
  const { googleLogin } = useAuth();
  const [optionInputForm, setOptionInputForm] = useState({
    showPassword: false,
    IsRemembered: false,
  });
  const { IsRemembered, showPassword } = optionInputForm;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => {
    setOptionInputForm((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleRememberedChanged = (e) => {
    setOptionInputForm((prev) => ({
      ...prev,
      [e.target.name]: !prev[e.target.name],
    }));
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(async () => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const idToken = await auth.currentUser.getIdToken(true);
        console.log('idToken: ',idToken)
        // await googleLogin(idToken, (data) => {
        // console.log(data);
        //   if (!data.isCreated) {
        //     navigate('../new/google', {
        //       state: {
        //         profile: data.profile,
        //       },
        //     });
        //   } else {
        //     navigate('/');
        //   }
        // });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        console.log('REsult from facebook login:', result);

        console.log('user: ', auth.currentUser);
        const idToken = await auth.currentUser.getIdToken();
        console.log(idToken);
        await googleLogin(idToken, (data) => {
          console.log('Mic check fb login: ', data);
          //   if (!data.isCreated) {
          //     navigate('../new/google', {
          //       state: {
          //         profile: data.profile,
          //       },
          //     });
          //   } else {
          //     navigate('/');
          //   }
        });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
      });
  };
  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      mt={5}
      onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        id='email_outlined-basic'
        label='Email Address'
        variant='outlined'
        fullWidth
        helperText='Invalid'
        name='email'
        control={control}
        error={errors?.email}
      />
      <InputForm
        id='password_outlined-basic'
        label='Password'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        fullWidth
        helperText='Invalid'
        sx={{ m: '30px 0' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        name='password'
        control={control}
        error={errors?.password}
      />

      <FormHelperText error={!!error}>{error}</FormHelperText>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          m: '10px 0',
        }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={IsRemembered}
              onChange={handleRememberedChanged}
              name='IsRemembered'
            />
          }
          label='Remember me'
        />
        <CustomLink href='#' underline='hover'>
          Forgot password?
        </CustomLink>
      </Box>
      <Button
        size='large'
        type='submit'
        variant='contained'
        disabled={loading}
        fullWidth
        sx={{
          boxShadow: 'rgb(25 113 200 / 24%) 0px 8px 16px 0px',
        }}>
        {loading ? <CircularProgress size={25} /> : 'Log in'}
      </Button>
      <Divider />
      {/* <GoogleLogin
        clientId={
          '212149569390-vso3vlqvs1q9ib87tba288n7a13dn4oo.apps.googleusercontent.com'
        }
        buttonText='Log in with Google'
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleLogin}
        cookiePolicy={'single_host_origin'}
        render={(renderProps) => (
          <GoogleButton
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            style={{ width: '100%', backgroundColor: '#f44336' }}
          />
        )}
      /> */}

      <GoogleButton
        onClick={handleGoogleLogin}
        style={{ width: '100%', backgroundColor: '#f44336' }}
      />
      <Button
        size='large'
        variant='contained'
        disabled={loading}
        fullWidth
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 2,
        }}
        onClick={handleFacebookLogin}>
        <img src={FacebookLogo} alt='FB logo' style={{ width: '28px' }} />
        <Box flex={1}>Login with Facebook</Box>
      </Button>
      <Typography component='p' sx={{ mt: 4 }}>
        Don’t have an account?{' '}
        <CustomLink href='#' underline='hover'>
          Get started
        </CustomLink>
      </Typography>
    </Box>
  );
};

const CustomLink = styled(Link, { name: 'StyledLink', slot: 'Custom' })({
  fontWeight: 600,
});
const Divider = styled('div')({
  margin: '30px 0',
  height: 1,
  width: '100%',
  backgroundColor: 'lightgray',
  position: 'relative',
  '&::after': {
    content: "'Or'",
    display: 'inline-block',
    position: 'absolute',
    padding: '0 16px',
    background: 'white',
    left: '50%',
    textAlign: 'center',
    transform: 'translate(-50%, -50%)',
  },
});

const schema = yup.object().shape({
  email: yup
    .string('Email must be a string')
    .email('Email must be a valid email')
    .required('Email is a required field'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(20)
    .required(),
});

LoginForm.propTypes = {};

export default LoginForm;
