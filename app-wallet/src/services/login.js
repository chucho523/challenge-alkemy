import { ENDPOINT } from "./ENDPOINT";
import axios from 'axios';

export default function register ({email, password}){
    return axios.post(ENDPOINT+'/users/login', {email, password})
    .then(response =>{
        return response;
    })
    .then(data=>{
        return data.data;
    })
    
}