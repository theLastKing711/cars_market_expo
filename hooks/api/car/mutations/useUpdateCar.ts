
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { UpdateCarOfferRequestData } from "@/types/car/updateCarOffer";
import {  useMutation, useQueryClient} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocalSearchParams } from "expo-router";

// but can be achieved using a styling library like Nativewind.
export function useUpdateCarOffer() {

    const queryClient = useQueryClient();


    const { id } = useLocalSearchParams<{
        id: string;
      }>();
    
   const { mutate: updateCarOffer, isPending } = useMutation(
        {
            mutationFn: 
                (updateCarOfferRequestData: UpdateCarOfferRequestData,) => 
                    updateCarOfferApi(updateCarOfferRequestData, id),
            onSuccess:
                () =>
                    {
                        queryClient.invalidateQueries({queryKey: ['getUpdateCarOffer', id.toString()]})
                        queryClient.invalidateQueries({queryKey: ['searchMyCars']})
                    }
        }
    );
    
    return {
        id,
        isLoading: isPending,
        updateCarOffer,
    }
    
}
  
export async function updateCarOfferApi(updateCarOfferRequestData: UpdateCarOfferRequestData, id: string) {
    
    try {
        const updateCarOfferUrl = `${HOME_URI}/${id}`;
        
        // const updateCarOfferUrl = `${HOME_URI}`;

        
        const response = await apiClient
                                .patch
                                (
                                    updateCarOfferUrl,
                                    updateCarOfferRequestData
                                );

        return {
            data: response.data,
        }
    }
    catch(err) {

        console.log('error', (err as AxiosError).request);
        
        return Promise.reject(false);
    }

}