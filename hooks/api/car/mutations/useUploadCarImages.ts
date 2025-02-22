
import { FILES_MANY_URL, FILES_URL, HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { UploadFileResponseData } from "@/types/shared";
import {  useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// but can be achieved using a styling library like Nativewind.
export function useUploadCarImages() {

    
   const { mutate: uploadCarImages } = useMutation(
        {
            mutationFn:(carImagesFormData: FormData) => uploadCarImagesApi(carImagesFormData)
        }
    );
    
    return {
        uploadCarImages,
    }
    
}
  
export async function uploadCarImagesApi(carImagesFormData: FormData) {
    
    try {

        // console.log(carImagesFormData);
        
        const uploadCarImagesUrl = `${FILES_MANY_URL}`;
        
        // for (const value of carImagesFormData.values()) {
        //     console.log(value);
        // }
        
        const response = await apiClient
                                .postForm<UploadFileResponseData[]>
                                (
                                    uploadCarImagesUrl,
                                    carImagesFormData, 
                                    {
                                        timeout: 6000 * 30 
                                    }
                                );
                                
        console.log("success", response.data);

        return {
            data: response.data,
        }
    }
    catch(err) {

        const result = (err as AxiosError);


        console.log('error', (err as AxiosError).request);

        
        return Promise.reject(result);
    }

}