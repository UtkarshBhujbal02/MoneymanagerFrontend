import axios from "axios";
import {BASE_URL} from "./apiEndpoints.js";

const axiosConfig = axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type": "application/json",
        Accept:"application/json"
    }

});

//list of endpoinnts that do not reuuire authorization header
const excludeEndpoints = ["/login","/register","/status","/activate","/health"];

//request interceptor
axiosConfig.interceptors.request.use((config) => {
    const shouldSkiptoken = excludeEndpoints.some((endpoint) => {
        config.url?.includes(endpoint)

    });

    if(!shouldSkiptoken){
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
},(error) => {
    return Promise.reject(error);
})

//responser interceptor
axiosConfig.interceptors.response.use((response) => {
    return response;
},(error) => {
   if (error.resonse){
       if(error.response.status === 401) {
           window.location.href = "/login";
       }else if (error.response.status === 500) {
           console.error("Server error. Please try again later.");
       }
   }else if(error.code === "ECONNABORTED"){
       console.error("Request timeout. Please try again.");

   }
   return Promise.reject(error);
})