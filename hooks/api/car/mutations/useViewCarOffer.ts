
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import {  useMutation } from "@tanstack/react-query";

export function useViewCarOffer(id: number) {

   const { mutate: viewCarOffer } = useMutation(
        {
            mutationFn:() => viewCarOfferApi(id),
        }
    );
    
    return {
        viewCarOffer,
    }
    
}
  
export async function viewCarOfferApi(id: number) {
    
    try {
        const viewCarOfferUrl = `${HOME_URI}/${id}/viewCarOffer`;
        
        const response = await apiClient
                                .patch
                                (
                                    viewCarOfferUrl,
                                );

        return {
            data: response.data,
        }
    }
    catch(err) {
        
        return Promise.reject(false);
    }

}