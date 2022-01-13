import axios from './axios';

const getFriends = () => {
  return axios.get('/api/users/me/friends');
};

const userApi = { getFriends };
export default userApi;