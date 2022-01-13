import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../context/AuthContext';

function RequireAuth({ children }) {
  const { authState } = useAuth();
  const location = useLocation();

  if (!authState?.user) {
  }

  useEffect(() => {
    console.log('REQUIRE AUTH: ', authState?.user);
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/login' state={{ from: location }} replace />;
  }, [authState.user, location]);

  return children;
}

export default RequireAuth;
