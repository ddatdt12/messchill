import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
} from '@mui/material';
import { styled, alpha } from '@mui/system';
import SendIcon from '@mui/icons-material/Send';

const InputMessageForm = ({ inputMessage, setInputMessage, onSubmit }) => {
  return (
    <Box
      component='form'
      sx={{
        flex: 1,
        '& > div': { width: '100%' },
      }}
      noValidate
      autoComplete='off'
      onSubmit={onSubmit}>
      <FormControl>
        <MessageInput
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton type="submit" disabled={!inputMessage} >
                <SendIcon color='primary' />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </Box>
  );
};

InputMessageForm.propTypes = {
  inputMessage: PropTypes.string,
  setInputMessage: PropTypes.func,
  onSubmit: PropTypes.func,
};

const MessageInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    width: '100%',
    borderRadius: theme.spacing(2),
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '6px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),

    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default InputMessageForm;
