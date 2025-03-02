
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { UpdateCarOfferRequestData } from "@/types/car/updateCarOffer";
import {  useMutation} from "@tanstack/react-query";
import { AxiosError } from "axios";

// but can be achieved using a styling library like Nativewind.
export function useUpdateCarOffer() {

    
   const { mutate: updateCarOffer } = useMutation(
        {
            mutationFn:(updateCarOfferRequestData: UpdateCarOfferRequestData) => updateCarOfferApi(updateCarOfferRequestData)
        }
    );
    
    return {
        updateCarOffer,
    }
    
}
  
export async function updateCarOfferApi(updateCarOfferRequestData: UpdateCarOfferRequestData) {
    
    try {
        // const updateCarOfferUrl = `${HOME_URI}/${id}`;
        
        const updateCarOfferUrl = `${HOME_URI}`;

        
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