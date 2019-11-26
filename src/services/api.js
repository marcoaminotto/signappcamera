import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.25.8:1111'
});

export default api;