import { AUTH_URL } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { setTokenAsync } from "@/libs/axios/secureStorage";
import { ChangePhoneNumberRequestData } from "@/types/auth/changePhoneNumber";
import { TokenResponse } from "@/types/auth/token";
import {  useMutation } from "@tanstack/react-query";
import { AxiosError, HttpStatusCode } from "axios";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export function useChangePhoneNumber() {

    
   const { mutate: changePhoneNumber } = useMutation(
        {
            mutationFn:(ChangePhoneNumberRequestData: ChangePhoneNumberRequestData) => ChangePhoneNumberApi(ChangePhoneNumberRequestData)
        }
    );
    
    return {
        changePhoneNumber,
    }
    
}
  
export async function ChangePhoneNumberApi(changePhoneNumberRequestData: ChangePhoneNumberRequestData) {
    
    try {
        const changePhoneNumberUrl = `${AUTH_URL}/change-phone-number`;
        
        const response = await apiClient
                                .patch<TokenResponse>
                                (
                                    changePhoneNumberUrl,
                                    changePhoneNumberRequestData
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

        return Promise.reject(err);
    }

}