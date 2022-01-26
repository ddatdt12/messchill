import axios from './axios';

const authenticate = () => {
  return axios.get('/api/auth');
};
const login = (email, password) => {
  return axios.post('/api/auth/login', {
    email,
    password,
  });
};
const register = (data) => {
  return axios.post('/api/auth/register', data);
};
const googleLogin = (idToken) => {
  return axios.post('/api/auth/login/google', {
    idToken,
  });
};
const logout = () => {
  return axios.get('/api/auth/logout');
};
const auth = { authenticate, login, logout, googleLogin, register };
export default auth;
