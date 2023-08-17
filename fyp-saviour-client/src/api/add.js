import axios from 'axios';

export const add = (endPoint, data) => {
  let token = '';
  let localtoken = localStorage.getItem('idToken');
  if (localtoken) {
    token = localtoken;
  }
  return new Promise((resolve, reject) => {
    return axios
      .post('http://127.0.0.1:9000/api' + endPoint, data, {
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
