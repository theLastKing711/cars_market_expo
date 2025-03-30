
import { AUTH_URL } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { setTokenAsync } from "@/libs/axios/secureStorage";
import { RegisterRequestData, RegisterResponseData } from "@/types/auth/register";
import {  useMutation } from "@tanstack/react-query";
import { AxiosError, HttpStatusCode } from "axios";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';

// but can be achieved using a styling library like Nativewind.
export function useRegister() {

    
   const { mutate: register } = useMutation(
        {
            mutationFn:(registerRequestData: RegisterRequestData) => RegisterApi(registerRequestData)
        }
    );
    
    return {
        register,
    }
    
}
  
export async function RegisterApi(registerRequestData: RegisterRequestData) {
    
    try {
        const RegisterUrl = `${AUTH_URL}/register`;
        
        const response = await apiClient
                                .post<RegisterResponseData>
                                (
                                    RegisterUrl,
                                    registerRequestData
                                );

        const phone_number = registerRequestData.phone_number;

        if(response.status === HttpStatusCode.Conflict)
        {
            
                router.push({
                    pathname: "/verify-password/[phone_number]",
                    params: {
                        phone_number,
                    },
                });
        } 

        if(response.status === HttpStatusCode.Ok)
        {

            alert("hello world");
            
            router.push({
                pathname: "/create-password/[phone_number]",
                params: {
                    phone_number,
                },
            });
            
        }

        return {
            data: response.data,
        }
    }
    catch(err) {

        alert("error");

        console.log('error', (err as AxiosError).request);
        
        return Promise.reject(false);
    }

}