
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import {  useMutation, useQueryClient} from "@tanstack/react-query";
import { AxiosError } from "axios";

// but can be achieved using a styling library like Nativewind.
export function useDeleteCarOffer(id: number, onSuccess?: () => void) {

    const queryClient = useQueryClient();
    
   const { mutate: DeleteCarOffer } = useMutation(
        {
            mutationFn: 
                () => 
                    DeleteCarOfferApi(id),
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
        DeleteCarOffer,
    }
    
}
  
export async function DeleteCarOfferApi(id: number) {
    
    try {
        const DeleteCarOfferUrl = `${HOME_URI}/${id}`;
        
        
        const response = await apiClient
                                .delete
                                (
                                    DeleteCarOfferUrl,
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