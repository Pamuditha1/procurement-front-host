import http from "./httpService";
import { toast } from "react-toastify";
import { api } from "./api";

const apiEndPoint = `${api}/update-user`;

export default function updateUser(user) {
  return http
    .put(apiEndPoint, user)
    .then(function (response) {
      toast.success(`${response.data}`);
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
