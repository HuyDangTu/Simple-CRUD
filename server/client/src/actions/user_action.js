import axios from 'axios';
import {USER_SERVER} from '../components/ultils/mise';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    STORE_REGISTER_INFO,
    GET_ALL_USERS,
    GET_USER,
    UPDATE_PRO,
    UPDATE_IMG,
    } from './types';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
    .then(response => response.data);
    return {
        type: REGISTER_USER,
        payload: request,
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
    .then(response => response.data);
    console.log(request);
    return{
        type: LOGIN_USER,
        payload: request
    };
}

export function loginByFaceGoogle(email) {
    let data = {email}
    const request = axios.post(`${USER_SERVER}/loginByFaceGoogle`, data)
        .then(response => response.data);
    console.log(request);
    return {
        type: LOGIN_USER,
        payload: request
    };
}

export function storeInfoForRegister(data) {
    return {
        type: STORE_REGISTER_INFO,
        payload: data
    };
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);
    return {
        type: AUTH_USER,
        payload: request,
    }
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`)
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request,
    }
}

export function addToCart(_id){
    const request = axios.post(`${USER_SERVER}/addToCart?productId=${_id}`)
    .then(response => response.data);
    return  {
        type: ADD_TO_CART,
        payload: request
    }
}

export function searchUser(keyword) {
    let data = { keyword }
    const request = axios.post(`${USER_SERVER}/search`,data)
        .then(response => response.data);
    return request
}
export function all(){
    const request = axios.get(`${USER_SERVER}`)
    .then(response=> response.data.accounts);
    return {
        type: GET_ALL_USERS,
        payload: request
    }
}
export function get(id){
    const request = axios.get(`${USER_SERVER}/info/${id}`)
    .then(response=> response.data);
    return {
        type: GET_USER,
        payload: request
    }
}
export function changeProfile(id,dataToSubmit) {
    const request = axios.put(`${USER_SERVER}/update/${id}`, dataToSubmit)
    .then(response => response.data);
    console.log(request);
    return {
        type: UPDATE_PRO,
        payload: request
    }
}
export function updateprofileimgfile(file) {
    let formData = new FormData();
    const config = {
        header: { 'content-type': 'multipart/form-data' }
    }
    formData.append("file", file)
    const request = axios.post('/api/users/uploadimage', formData, config)
        .then(response => response.data);
    return {
        type: UPDATE_IMG,
        payload: request
    }
}
export function updateprofileimg(url,id) {
    const config =
    {
        url
    }
    
    const request = axios.put(`/api/users/updatepic/${id}`, config)
        .then(response => response.data)
    return {
        type: UPDATE_PRO,
        payload: request
    }
}
export function updateprofile(id) {
    const request = axios.get(`${USER_SERVER}/profile/${id}`)
        .then(response => response.data)
    return {
        type: UPDATE_PRO,
        payload: request
    }
}
export function disableuser(id) {
    const request = axios.put(`${USER_SERVER}/delete/${id}`)
    .then(response => response.data)
    return{
        type: UPDATE_PRO,
        payload:request
    }
}