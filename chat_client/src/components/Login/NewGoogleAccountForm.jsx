import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import InputForm from 'components/shared/InputForm';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const NewGoogleAccountForm = ({ onSubmit, loading, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    email: '',
    image: '',
  });
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location.state);
    if (location.state?.profile) {
      const { email, picture } = location.state?.profile;
      setProfile({ email, image: picture });
    } else {
      navigate('/authentication/login');
    }
  }, [location, navigate]);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const handleCreateAccountSubmit = (data) => {
    if (data.confirmPassword !== data.password) {
      setError('confirmPassword', {
        type: 'manual',
        message: "Password and confirm password don't match!",
      });
      return;
    }
    onSubmit({
      ...profile,
      ...data,
    });
  };
  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      mt={5}
      onSubmit={handleSubmit(handleCreateAccountSubmit)}>
      <InputForm
        id='name_outlined-basic'
        label='Name'
        variant='outlined'
        fullWidth
        helperText='Invalid name'
        name='name'
        control={control}
        error={errors?.name}
        sx={{ marginBottom: 4 }}
      />
      <TextField
        id='email_outlined-basic'
        label='Email'
        variant='outlined'
        fullWidth
        name='email'
        value={profile?.email || ''}
        sx={{ marginBottom: 4 }}
        InputProps={{
          readOnly: true,
        }}
      />
      <InputForm
        id='password_outlined-basic'
        label='Password'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        fullWidth
        helperText='Invalid'
        sx={{ marginBottom: 4 }}
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
      <InputForm
        id='confirm_password_outlined-basic'
        label='Confirm password'
        variant='outlined'
        type={showPassword ? 'text' : 'password'}
        fullWidth
        helperText='Invalid'
        sx={{ marginBottom: 4 }}
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
        name='confirmPassword'
        control={control}
        error={errors?.confirmPassword}
      />
      <FormHelperText error={!!error}>{error}</FormHelperText>
      <Button
        size='large'
        type='submit'
        variant='contained'
        disabled={loading}
        fullWidth
        sx={{
          boxShadow: 'rgb(25 113 200 / 24%) 0px 8px 16px 0px',
        }}>
        {loading ? <CircularProgress size={25} /> : 'Create Account'}
      </Button>
    </Box>
  );
};

const schema = yup.object().shape({
  name: yup
    .string('Name must be a string')
    .required('Name is a required field'),
  password: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(20)
    .required(),
  confirmPassword: yup
    .string()
    .min(4, 'Password must be at least 4 characters')
    .max(20)
    .required(),
});

NewGoogleAccountForm.propTypes = {};

export default NewGoogleAccountForm;
