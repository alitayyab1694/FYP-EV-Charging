import axios from 'axios';
export const getAuth0User = (endPoint, access_token) => {
  return new Promise((resolve, reject) => {
    return axios
      .get(`https://evapdev.us.auth0.com/${endPoint}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
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
