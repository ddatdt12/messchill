import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:5000'
      : process.env.REACT_APP_API_URL,
  withCredentials: true,
});
