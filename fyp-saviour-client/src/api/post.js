import axios from 'axios';
import { BASE_URL, CSMS_BASE_URL } from './baseUrl';

export const post = (endPoint, data, csms = false) => {
  let token = '';
  let localtoken = null;
  if (localtoken) {
    token = localtoken;
  }
  const URL = csms ? CSMS_BASE_URL : BASE_URL;
  return new Promise((resolve, reject) => {
    return axios
      .post(URL + 'api' + endPoint, data, {
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
