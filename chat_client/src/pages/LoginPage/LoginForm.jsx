import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputForm from '../../components/InputForm';

const CustomLink = styled(Link, { name: 'StyledLink', slot: 'Custom' })({
  fontWeight: 600,
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

const LoginForm = ({ onSubmit, loading }) => {
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

  return (
    <Box
      component='form'
      noValidate
      autoComplete='off'
      mt={5}
      onSubmit={handleSubmit(onSubmit)}>
      <InputForm
        id='outlined-basic'
        label='Email Address'
        variant='outlined'
        fullWidth
        helperText='Invalid'
        name='email'
        control={control}
        error={errors?.email}
      />
      <InputForm
        id='outlined-basic'
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
        {loading ? <CircularProgress /> : 'Log in'}
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

LoginForm.propTypes = {};

export default LoginForm;
