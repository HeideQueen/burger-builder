import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-c5d8c.firebaseio.com/',
});

export default instance;
