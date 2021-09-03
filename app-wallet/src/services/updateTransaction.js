import { ENDPOINT } from "./ENDPOINT";
import axios from 'axios';

export default function postTransaction ({amount, concept, type, category, date}, idTransaction){
    const token = window.localStorage.getItem('token'); //get token
    const credentials={//headers to send token
        headers: {Authorization: `Bearer ${token}`}
    }
    return axios.put(ENDPOINT+'/transactions/'+idTransaction, {amount, concept, type, category, date}, credentials)

    .then(response =>{
        return response.data;
    })
    
}