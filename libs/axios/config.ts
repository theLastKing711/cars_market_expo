import axios, { AxiosError } from "axios";
import { BASE_URI } from "@/constants/api";
import {  getTokenAsync } from "./secureStorage";
import { router } from "expo-router";


export const apiClient = axios.create({
    baseURL: BASE_URI,
    // withCredentials: true,
    timeout: 6000,
    // headers: {
    //     Authorization: `BEARER ${access_token}`
    // }
    // withXSRFToken: true,
    // xsrfCookieName: "XSRF-TOKEN",
    // xsrfHeaderName: "X-XSRF-TOKEN",
});
// apiClient
//     .interceptors
//     .request
//     .use(async (config: any) => {
//         const access_token =  await getTokenAsync();

//         if(! access_token)
//         {
//             router.navigate('/home');//after if code continue to run so we must return
//             return;
//         }

//         return {
//             ...config,
//             headers: {
//                 ...config.headers,
//                 Authorization: `Bearer ${access_token}`
//             }
//         };
    
//     }
// );

apiClient
    .interceptors
    .response
    .use(
        (response) => response,
        (error) => {
            console.log("error", (error as AxiosError).toJSON())
            router.navigate("/home")
        }
    );
