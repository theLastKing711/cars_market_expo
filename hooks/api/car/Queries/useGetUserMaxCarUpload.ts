
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { GetUserMaxCarUploadResponseData } from "@/types/car/GetUserMaxCarUploadResponseData";
import {  useQuery } from "@tanstack/react-query";

export function useGetmaxCarUpload() {

    
   const {data, isLoading} = useQuery(
        {
            queryKey: ['maxCarUpload'],
            queryFn:() => GetMaxCarUploadApi()
        }
    );
    
    return {
        data,
        isLoading
    }
    
}
  
export async function GetMaxCarUploadApi() {
    
    try {
        const getMaxCarUploadUrl = `${HOME_URI}/maxCarUpload`;
        
        const response = await apiClient
                                .get<GetUserMaxCarUploadResponseData>
                                (getMaxCarUploadUrl);

        return {
            data: response.data,
        }
    }
    catch(err) {

        return Promise.reject(false);
    }

}