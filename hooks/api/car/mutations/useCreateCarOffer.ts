
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { CreateCarOfferRequestData } from "@/types/car/createCarOffer";
import {  useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

// but can be achieved using a styling library like Nativewind.
export function useCreateCarOffer() {

    
   const { mutate: createCarOffer } = useMutation(
        {
            mutationFn:(createCarOfferRequestData: CreateCarOfferRequestData) => createCarOfferApi(createCarOfferRequestData)
        }
    );
    
    return {
        createCarOffer,
    }
    
}
  
export async function createCarOfferApi(createCarOfferRequestData: CreateCarOfferRequestData) {
    
    try {
        const createCarOfferUrl = `${HOME_URI}`;
        
        const response = await apiClient
                                .post
                                (
                                    createCarOfferUrl,
                                    createCarOfferRequestData
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