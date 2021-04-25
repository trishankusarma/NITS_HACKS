import axios from 'axios';

const Instance = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:5000`,
  withCredentials:true,
  credentials:'include'
});

export default Instance;