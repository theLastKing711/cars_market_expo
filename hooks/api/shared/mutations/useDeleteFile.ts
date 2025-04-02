
import { FILES_URL, HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { CarOfferDetailsRespnseData } from "@/types/car/carOfferDetails";
import { FilePublicIdPathParameterData } from "@/types/shared";
import {  useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

// but can be achieved using a styling library like Nativewind.
export function useDeleteFileApi() {

    const { mutate: deleteFile } = useMutation(
          {
              mutationFn:(filePublicIdPathParameterData: FilePublicIdPathParameterData) => deleteFileApi(filePublicIdPathParameterData),
              retry: 3
          }
      );
    
    return {
        deleteFile
    }
    
}

export async function deleteFileApi({ public_id }: FilePublicIdPathParameterData) {
    try {
        const deleteFileUrl = `${FILES_URL}/${public_id}`;
        
        const response = await apiClient
                                .delete(deleteFileUrl);

        console.log("response data", response.data);
        
        return {
            data: response.data,
        }
    }
    catch(err) {
        console.log('error', (err as AxiosError).request);
                
        return Promise.reject(false);
    }

}