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
const logout = () => {
  return axios.get('/api/auth/logout');
};
const auth = { authenticate, login, logout };
export default auth;
