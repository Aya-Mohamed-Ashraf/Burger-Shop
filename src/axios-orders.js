import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-shop.firebaseio.com/'
});

export default instance;