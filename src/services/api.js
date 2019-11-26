import axios from 'axios';

const api = axios.create({
    //Está apontando para o servidor
    baseURL: 'http://192.168.25.8:1111'
});

export default api;