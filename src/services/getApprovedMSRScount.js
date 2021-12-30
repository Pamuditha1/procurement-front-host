import http from "./httpService"
import axios from 'axios'
import { toast } from "react-toastify";
import {api} from './api'

const apiEndPoint = `${api}/view-msr/count/approved`;

export default function getApprovedMSRsCount() {
        
    return http.get(apiEndPoint)
    .then(function (response) {
        // console.log(response.data);
        // toast.success(`${response.data}`);
        return response.data
    })
    .catch(function (error) {
        if(error.response.data) {
            console.log(error.response.data);
            toast.error(error.response.data);
        }
        if(error.response) {
            console.log(error.response);
            toast.error(error.response);
        }
        else {
            console.log(error);
            toast.error(error);
        }

    });

}