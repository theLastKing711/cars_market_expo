
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { getUpdateCarOffersRespnseData } from "@/types/car/getUpdateCarOffer";
import {  useQuery } from "@tanstack/react-query";

// but can be achieved using a styling library like Nativewind.
export function useGetUpdateCarOffer(id: string) {

    
   const {data, isLoading} = useQuery(
        {
            queryKey: ['getUpdateCarOffer', id],
            queryFn:() => getUpdateCarOfferApi(id)
        }
    );
    
    return {
        data,
        isLoading
    }
    
}
  
export async function getUpdateCarOfferApi(id: string) {
    
    try {
        const getCarOfferDetailsUrl = `${HOME_URI}/updateDetails/${id}`;
        
        const response = await apiClient
                                .get<getUpdateCarOffersRespnseData>
                                (getCarOfferDetailsUrl);

        return {
            data: response.data,
        }
    }
    catch(err) {

        return Promise.reject(false);
    }

}