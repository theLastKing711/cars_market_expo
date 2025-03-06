
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import {  useMutation, useQueryClient} from "@tanstack/react-query";
import { AxiosError } from "axios";

// but can be achieved using a styling library like Nativewind.
export function useSellCarOffer(id: number, onSuccess?: () => void) {

    const queryClient = useQueryClient();
    
   const { mutate: sellCarOffer } = useMutation(
        {
            mutationFn: 
                () => 
                    SellCarOfferApi(id),
            onSuccess:
                () =>
                    {
                        queryClient.removeQueries({queryKey: ['getUpdateCarOffer', id.toString()]});
                        queryClient.removeQueries({queryKey: ['carOfferDetails', id.toString()]});
                        queryClient.invalidateQueries({queryKey: ['home']});
                        queryClient.invalidateQueries({queryKey: ['searchMyCars']});
                        queryClient.invalidateQueries({queryKey: ['searchMyFavouriteCars']});
                        onSuccess?.();
                    }
        }
    );
    
    return {
        sellCarOffer,
    }
    
}
  
export async function SellCarOfferApi(id: number) {
    
    try {
        const SellCarOfferUrl = `${HOME_URI}/sell/${id}`;
        
        
        const response = await apiClient
                                .patch
                                (
                                    SellCarOfferUrl,
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