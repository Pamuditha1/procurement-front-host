import http from "./httpService";
import { toast } from "react-toastify";
import { api } from "./api";

const apiEndPoint = `${api}/update-user/remove`;

export default function removeeUser(id) {
  return http
    .delete(`${apiEndPoint}/${id}`)

    .then(function (response) {
      toast.dark(`${response.data}`);
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
