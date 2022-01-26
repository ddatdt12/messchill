import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

function RequireAuth({ children }) {
  const { authState } = useAuth();
  const location = useLocation();

  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  if (!authState?.user) {
    return (
      <Navigate to='/authentication/login' state={{ from: location }} replace />
    );
  }

  return children;
}

export default RequireAuth;
