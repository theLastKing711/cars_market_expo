import { CreatePasswordRequestData } from '@/types/auth/createPassword';

import { AUTH_URL } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { setTokenAsync } from "@/libs/axios/secureStorage";
import { TokenResponse } from "@/types/auth/token";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, HttpStatusCode } from "axios";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export function useCreatePassword() {

   const queryClient = useQueryClient();
    
   const { mutate: createPassword } = useMutation(
        {
            mutationFn:(createPasswordRequestData: CreatePasswordRequestData) => createPasswordApi(createPasswordRequestData),
            onSuccess: () => {
                queryClient.clear();
            }
        }
    );
    
    return {
        createPassword,
    }
    
}
  
export async function createPasswordApi(createPasswordRequestData: CreatePasswordRequestData) {
    
    try {
        const createPasswordUrl = `${AUTH_URL}/create-password`;
        
        const response = await apiClient
                                .post<TokenResponse>
                                (
                                    createPasswordUrl,
                                    createPasswordRequestData
                                );


        // if(response.status == HttpStatusCode.Ok)
        // {
        //     await setTokenAsync(response.data.token);
            
        //     router.back();
        // }
        
        return {
            data: response.data,
        }
    }
    catch(err) {

        return Promise.reject(false);
    }

}