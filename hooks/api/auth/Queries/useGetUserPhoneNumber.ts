
import { AUTH_URL } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { GetUserPhoneNumberResponseData } from "@/types/auth/getUserPhoneNumber";
import {  useQuery } from "@tanstack/react-query";

export function useGetUserPhoneNumber() {
    
   const {data, isLoading} = useQuery(
        {
            queryKey: ['getUserPhoneNumber'],
            queryFn:() => GetUserPhoneNumberApi()
        }
    );
    
    return {
        data,
        isLoading
    }
    
}
  
export async function GetUserPhoneNumberApi() {
    
    try {
        const getUserPhoneNumberUrl = `${AUTH_URL}/get-user-phone-number`;
        
        const response = await apiClient
                                .get<GetUserPhoneNumberResponseData>
                                (getUserPhoneNumberUrl);

        return {
            data: response.data,
        }
    }
    catch(err) {

        return Promise.reject(false);
    }

}