import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const InputForm = (props) => {
  const { name, control, error, ...otherProps } = props;

  return (
    // <TextField name={name} {...otherProps}/>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...otherProps}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

InputForm.propTypes = {};

export default InputForm;
