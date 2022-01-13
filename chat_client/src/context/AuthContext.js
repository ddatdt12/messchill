import React, { useEffect, useReducer } from 'react';
import authApi from '../api/auth';
import { authReducer } from '../reducer/authReducer';

const AuthContext = React.createContext({
  authState: {},
  login: () => {},
  logout: () => {},
});

const initialState = { isLoading: false, user: null, error: null };
export function AuthProvider({ children }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const authenticate = async () => {
      try {
        dispatch({
          type: 'AUTH_LOADING',
        });

        const res = await authApi.authenticate();
        dispatch({ type: 'SET_AUTH', payload: res.data?.user });
      } catch (error) {
        dispatch({ type: 'NO_LOGIN' });
      }
    };

    authenticate();
  }, []);

  const login = async (user, cb) => {
    try {
      dispatch({
        type: 'AUTH_LOADING',
      });
      const res = await authApi.login(user.email, user.password);
      dispatch({ type: 'SET_AUTH', payload: res.data.user });
      cb();
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'FAILED_LOGIN',
        payload: error.response?.data?.message ?? 'Server Error',
      });
    }
  };

  const logout = async (callback) => {
    try {
      await authApi.logout();
      dispatch('NO_LOGIN');
    } catch (error) {
      console.log(error);
    }
    callback();
  };

  const value = { authState, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return React.useContext(AuthContext);
}
