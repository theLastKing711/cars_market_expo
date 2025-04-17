
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import useLoadingStore from "@/state/useLoadingStore";
import {  useMutation, useQueryClient} from "@tanstack/react-query";


export function useDeleteCarOffer(id: number, onSuccess?: () => void, onError?: () => void) {

    const queryClient = useQueryClient();

  const {  params: {isLoading} ,showTransparentLoading, hideLoading } = useLoadingStore();


    
   const { mutate: DeleteCarOffer } = useMutation(
        {
            mutationFn: 
                () => {
                    return  DeleteCarOfferApi(id);
                },
            onSuccess:
                () =>
                    {
                        queryClient.removeQueries({queryKey: ['getUpdateCarOffer', id.toString()]});
                        queryClient.removeQueries({queryKey: ['carOfferDetails', id.toString()]});
                        queryClient.invalidateQueries({queryKey: ['home']});
                        queryClient.invalidateQueries({queryKey: ['searchMyCars']});
                        queryClient.invalidateQueries({queryKey: ['searchMyFavouriteCars']});
                        onSuccess?.();
                    },
            onError: 
                () => {
                    onError?.();
                },
            onSettled: 
                () => {
                    hideLoading();
             }
        }
    );
    
    return {
        isLoading,
        showTransparentLoading,
        hideLoading,
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

        return Promise.reject(false);
    }

}