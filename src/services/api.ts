import axios from 'axios';

const api = axios.create({
    baseURL: 'http://www.omdbapi.com/?apikey=f6ce0a28&'
});

export default api