import axios from 'axios';
import { BASE_URL } from './baseUrl';

export const get = (endPoint) => {
  let token = '';
  let localtoken = null;

  if (localtoken) {
    token = localtoken;
  }
  return new Promise((resolve, reject) => {
    return axios
      .get(BASE_URL + 'api' + endPoint, {
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token
        }
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
