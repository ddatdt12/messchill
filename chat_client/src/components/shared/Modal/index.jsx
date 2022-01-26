import { Dialog } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Profile from 'components/ModalBody/Profile';
import useModal from 'context/ModalContext';
import React from 'react';
import PeopleModal from './PeopleModal';
const Modal = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { open, type, setType } = useModal();

  const handleClose = (cleanCallback) => {
    if (cleanCallback) {
      cleanCallback();
    }
    setType(null);
  };
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby='responsive-dialog-title'>
      {type === 'profile' && <Profile onClose={handleClose} />}
      {type === 'people' && <PeopleModal />}
    </Dialog>
  );
};
export default Modal;
