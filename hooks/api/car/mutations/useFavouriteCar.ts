
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useFavouriteCar(id: number) {

   const queryClient = useQueryClient();

   const { mutate: favouriteCar } = useMutation(
        {
            mutationFn:() => favouriteCarApi(id),
            onSuccess:
                () =>
                    {
                        queryClient.invalidateQueries({queryKey: ['getUpdateCarOffer', id.toString()]})
                        queryClient.invalidateQueries({queryKey: ['carOfferDetails', id.toString()]})
                        queryClient.invalidateQueries({queryKey: ['home']})
                        queryClient.invalidateQueries({queryKey: ['searchMyFavouriteCars']})
                        queryClient.invalidateQueries({queryKey: ['searchMyCars']})

                    }
        }
    );
    
    return {
        favouriteCar,
    }
    
}
  
export async function favouriteCarApi(id: number) {
    
    try {
        const favouriteCarUrl = `${HOME_URI}/${id}/favourite`;
        
        const response = await apiClient
                                .patch
                                (
                                    favouriteCarUrl,
                                );

        return {
            data: response.data,
        }
    }
    catch(err) {
        
        return Promise.reject(false);
    }

}