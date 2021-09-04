import { ENDPOINT } from "./ENDPOINT";
import axios from 'axios';

export default function deleteTransaction (idTransaction){
    const token = window.localStorage.getItem('token'); //get token
    const credentials={//headers to send token
        headers: {Authorization: `Bearer ${token}`}
    }
    return axios.delete(ENDPOINT+'/transactions/'+idTransaction, credentials)

    .then(response =>{
        return response.data;
    })
    
}