
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { CreateCarOfferRequestData } from "@/types/car/createCarOffer";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// but can be achieved using a styling library like Nativewind.
export function useCreateCarOffer() {

    const queryClient = useQueryClient();

   const { mutate: createCarOffer,isPending } = useMutation(
        {
            mutationFn:(createCarOfferRequestData: CreateCarOfferRequestData) => createCarOfferApi(createCarOfferRequestData),
            onSuccess:
                () =>
                    {
                        queryClient.invalidateQueries({queryKey: ['home']});
                        queryClient.invalidateQueries({queryKey: ['searchMyCars']});
                        queryClient.invalidateQueries({queryKey: ['searchMyFavouriteCars']});
                        queryClient.invalidateQueries({queryKey: ['maxCarUpload']});
                    }
        }
    );
    
    return {
        createCarOffer,
        isLoading: isPending
    }
    
}
  
export async function createCarOfferApi(createCarOfferRequestData: CreateCarOfferRequestData) {
    
    try {
        const createCarOfferUrl = `${HOME_URI}`;

        console.log("createCarOfferRequestData", createCarOfferRequestData)
        
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
        console.log("error", (err as AxiosError));
        return Promise.reject(err);
    }

}