import http from "./httpService";
import { toast } from "react-toastify";
import { api } from "./api";

const apiEndPoint = `${api}/login`;

export default function userLogin(loginData) {
  return http
    .post(apiEndPoint, loginData)
    .then(function (response) {
      toast.success(`${response.data.msg}`);
      return response.data;
    })
    .catch(function (error) {
      if (error.response.data) {
        console.error(error.response.data);
        toast.error(error.response.data);
      }
      if (error.response) {
        console.error(error.response);
        toast.error(error.response);
      } else {
        console.error(error);
        toast.error(error);
      }
    });
}
