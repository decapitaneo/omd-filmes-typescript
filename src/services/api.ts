import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.omdbapi.com/?apikey=f6ce0a28&'
});

export default api