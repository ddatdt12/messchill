import React, { useState } from 'react';
import useAuth from './AuthContext';

const ModalContext = React.createContext(null);

export function ModalProvider({ children }) {
  const [type, setType] = useState('');

  const {
    authState: { user },
  } = useAuth();

  const getProfile = () => user;

  const value = { open: !!type, type, setType, getProfile };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export default function useModal() {
  return React.useContext(ModalContext);
}
