
import { HOME_URI } from "@/constants/api";
import { apiClient } from "@/libs/axios/config";
import { CarOfferDetailsRespnseData } from "@/types/car/carOfferDetails";
import {  useQuery } from "@tanstack/react-query";

export function useGetCarOfferDetails(id: string) {
    
   const {data, isLoading} = useQuery(
        {
            queryKey: ['carOfferDetails', id.toString()],
            queryFn:() => GetCarOfferDetailsApi(id)
        }
    );
    
    return {
        data,
        isLoading
    }
    
}
  
export async function GetCarOfferDetailsApi(id: string) {
    
    try {
        const getCarOfferDetailsUrl = `${HOME_URI}/${id}`;
        
        const response = await apiClient
                                .get<CarOfferDetailsRespnseData>
                                (getCarOfferDetailsUrl);

        return {
            data: response.data,
        }
    }
    catch(err) {

        return Promise.reject(false);
    }

}