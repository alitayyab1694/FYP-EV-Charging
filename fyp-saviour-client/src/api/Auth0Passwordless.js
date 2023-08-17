import axios from 'axios';
export const Auth0Passwordless = (endPoint, data) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(`https://evapdev.us.auth0.com/${endPoint}`, data, {
        headers: {
          'Content-Type': 'application/json'
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
