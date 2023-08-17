import axios from 'axios';
import { BASE_URL } from './baseUrl';
export const client = axios.create({
  timeout: 50000,
  baseURL: BASE_URL
});

client.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('token');
    if (token && token !== '') {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
client.interceptors.response.use(
  (response) => {
    return extractData(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const extractData = (data) => data.data;
