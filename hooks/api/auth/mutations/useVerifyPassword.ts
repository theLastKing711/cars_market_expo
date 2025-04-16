
import { AUTH_URL } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { TokenResponse } from "@/types/auth/token";
import { VerifyPasswordRequestData } from "@/types/auth/verifyPassword";
import {  useMutation, useQueryClient } from "@tanstack/react-query";

export function useVerifyPassword() {


   const queryClient = useQueryClient();

    
   const { mutate: verifyPassword } = useMutation(
        {
            mutationFn:(verifyPasswordRequestData: VerifyPasswordRequestData) => VerifyPasswordApi(verifyPasswordRequestData),
            onSuccess: () => {
                queryClient.clear()
            }
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