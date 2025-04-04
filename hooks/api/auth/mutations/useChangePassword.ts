import { AUTH_URL } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { setTokenAsync } from "@/libs/axios/secureStorage";
import { ChangePasswordRequestData } from "@/types/auth/changePassword";
import { TokenResponse } from "@/types/auth/token";
import {  useMutation } from "@tanstack/react-query";
import { AxiosError, HttpStatusCode } from "axios";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export function useChangePassword() {

    
   const { mutate: changePassword } = useMutation(
        {
            mutationFn:(changePasswordRequestData: ChangePasswordRequestData) => changePasswordApi(changePasswordRequestData)
        }
    );
    
    return {
        changePassword,
    }
    
}
  
export async function changePasswordApi(ChangePasswordRequestData: ChangePasswordRequestData) {
    
    try {
        const ChangePasswordUrl = `${AUTH_URL}/change-password`;
        
        const response = await apiClient
                                .patch<TokenResponse>
                                (
                                    ChangePasswordUrl,
                                    ChangePasswordRequestData
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