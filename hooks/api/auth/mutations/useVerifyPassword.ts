
import { AUTH_URL } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { setTokenAsync } from "@/libs/axios/secureStorage";
import { TokenResponse } from "@/types/auth/token";
import { VerifyPasswordRequestData } from "@/types/auth/verifyPassword";
import {  useMutation } from "@tanstack/react-query";
import { AxiosError, HttpStatusCode } from "axios";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export function useVerifyPassword() {

    
   const { mutate: verifyPassword } = useMutation(
        {
            mutationFn:(verifyPasswordRequestData: VerifyPasswordRequestData) => VerifyPasswordApi(verifyPasswordRequestData)
        }
    );
    
    return {
        verifyPassword,
    }
    
}
  
export async function VerifyPasswordApi(verifyPasswordRequestData: VerifyPasswordRequestData) {
    
    try {
        const verifyPasswordUrl = `${AUTH_URL}/verify-password`;
        
        const response = await apiClient
                                .post<TokenResponse>
                                (
                                    verifyPasswordUrl,
                                    verifyPasswordRequestData
                                );

        if(response.status == HttpStatusCode.Ok)
        {
            await setTokenAsync(response.data.token);
            router.back();
        }

        return {
            data: response.data,
        }
    }
    catch(err) {

        console.log('error', (err as AxiosError).request);
        
        return Promise.reject(false);
    }

}