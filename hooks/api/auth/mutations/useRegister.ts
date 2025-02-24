
import { AUTH_URL } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { setTokenAsync } from "@/libs/axios/secureStorage";
import { RegisterRequestData, RegisterResponseData } from "@/types/auth/register";
import {  useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as SecureStore from 'expo-secure-store';

// but can be achieved using a styling library like Nativewind.
export function useRegister() {

    
   const { mutate: register } = useMutation(
        {
            mutationFn:(RegisterRequestData: RegisterRequestData) => RegisterApi(RegisterRequestData)
        }
    );
    
    return {
        register,
    }
    
}
  
export async function RegisterApi(RegisterRequestData: RegisterRequestData) {
    
    try {
        const RegisterUrl = `${AUTH_URL}/register`;
        
        const response = await apiClient
                                .post<RegisterResponseData>
                                (
                                    RegisterUrl,
                                    RegisterRequestData
                                );

        await setTokenAsync(response.data.token);

        return {
            data: response.data,
        }
    }
    catch(err) {

        console.log('error', (err as AxiosError).request);
        
        return Promise.reject(false);
    }

}