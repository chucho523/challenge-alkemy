import { ENDPOINT } from "./ENDPOINT.JS";
import axios from 'axios';

export default function register ({email, name, password}){
    const body = {email, name, password};
    axios.post(ENDPOINT+'/users/register', body)
    .then(res =>{
        if(!res.ok) throw new Error('response in not ok')
        return res;
    })
}