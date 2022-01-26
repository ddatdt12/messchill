import axios from './axios';

const getUserFriends = () => {
  return axios.get('/api/users/me/friends');
};
const updateProfile = (formData) => {
  return axios.put('/api/users/me/profile', formData);
};

const userApi = { getUserFriends,updateProfile };
export default userApi;
