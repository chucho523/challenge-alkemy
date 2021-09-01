import { ENDPOINT } from "./ENDPOINT";
import axios from 'axios';

export default function register ({email, name, password}){
    return axios.post(ENDPOINT+'/users/register', {email, name, password})
    .then(response =>{
        return response;
    })
    
}