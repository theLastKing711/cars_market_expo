
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { DeletableMediaData } from "@/types/shared";
import {  useMutation, useQueryClient} from "@tanstack/react-query";
import { AxiosError } from "axios";

// but can be achieved using a styling library like Nativewind.
export function useUpdateCarImages(id: string) {

   const queryClient = useQueryClient();

   const { mutate: UpdateCarImages } = useMutation(
        {
            mutationFn:(carImagesFormData: FormData) => UpdateCarImagesApi(carImagesFormData, id),
            onSuccess:
                () =>
                    {
                        queryClient.invalidateQueries({queryKey: ['getUpdateCarOffer', id.toString()]})
                        queryClient.invalidateQueries({queryKey: ['searchMyCars']})
                    }
        }
    );
    
    return {
        UpdateCarImages,
    }
    
}
  
export async function UpdateCarImagesApi(carImagesFormData: FormData, id: string) {
    
    try {

        const UpdateCarImagesUrl = `${HOME_URI}/${id}/images`;

        const response = await apiClient
                                .postForm<DeletableMediaData[]>
                                (
                                    UpdateCarImagesUrl,
                                    carImagesFormData, 
                                    {
                                        timeout: 6000 * 30 
                                    }
                                );
                                
        return {
            data: response.data,
        }
    }
    catch(err) {

        const result = (err as AxiosError);


        return Promise.reject(result);
    }

}