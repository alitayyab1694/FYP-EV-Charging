import axios from "axios";
import { BASE_URL } from "./baseUrl";

export const patch = (endPoint, data) => {
  let token = "";
  let localtoken = localStorage.getItem("idToken");
  if (localtoken) {
    token = localtoken;
  }
  return new Promise((resolve, reject) => {
    return axios
      .patch(BASE_URL + endPoint, data, {
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
