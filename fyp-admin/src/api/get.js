import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const get = (endPoint) => {
  let token = "";
  let localtoken = localStorage.getItem("evap-user");
  if (localtoken) {
    token = JSON.parse(localtoken).token;
  }
  return new Promise((resolve, reject) => {
    return axios
      .get(BASE_URL + endPoint, {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
      })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
