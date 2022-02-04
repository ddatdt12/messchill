import LoginForm from 'components/Auth/LoginForm';
import TopTitle from 'components/Auth/TopTitle';
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../context/AuthContext';

const Login = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState, login } = useAuth();

  const from = location.state?.from?.pathname || '/';

  if (authState.user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (data) => {
    await login(data, () => {
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.
      navigate(from, { replace: true });
    });
  };

  return (
    <>
      <TopTitle />
      <LoginForm
        onSubmit={handleSubmit}
        loading={authState?.isLoading}
        error={authState?.error}
      />
    </>
  );
};


export default Login;
