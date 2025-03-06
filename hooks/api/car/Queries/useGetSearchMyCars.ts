import { useState } from 'react';
import { HOME_URI } from '@/constants/api';
import { apiClient } from "@/libs/axios/config";
import { SearchMyCarQueryParameterData } from '@/types/car/searchMyCars';
import {SearchCarOfferPaginationResultData } from "@/types/home";
import { InifinteQueryPageParam } from '@/types/shared';
import { useInfiniteQuery } from "@tanstack/react-query";
import { AxiosError } from 'axios';

export function useGetSearchMyCars() {
    
    const [search, setSearch] = useState('')

    // //must be called manually in view
    const {data, isLoading, hasNextPage, isFetching, fetchNextPage} = useInfiniteQuery(
        {
            //if one of debounced parameters change,then re-run the query with updated values
            //(enabled must be true also => one of the values in not empty)
            // queryKey: ['home', debouncedSearchTerm, debouncedPaginationCursor],
            queryKey: 
                [
                    'searchMyCars',
                    search
                ],
            // page param is in the defenition of queryfn and it takes its type from initalPageParam as seen below
            queryFn :({pageParam}) => getMyCarsSearchApi({
                search,
                page: pageParam || ''
            }),
            // enabled: shouldSearch, // if false it won't fetch data 
            getNextPageParam: (lastPageParam, pages) => {
                const nextPage = lastPageParam?.next_page ? lastPageParam?.next_page.toString() : undefined; 

                return nextPage;
            },
            initialPageParam: null as InifinteQueryPageParam['pageParam'], // if we don't type it and initilaze it when its type becomes null and we can't assign other values to it
        },
    );

    return {
        data,
        isLoading,
        isFetching,
        hasNextPage,
        search,
        setSearch,
        fetchNextPage,
    }
    
}
  
async function getMyCarsSearchApi({
    page,
    search,
}: SearchMyCarQueryParameterData) {
    try {

        const search_url = `${HOME_URI}/searchMyCars`;

        const response = await apiClient
                                .get<SearchCarOfferPaginationResultData>
                                (
                                    search_url, {
                                        params: {
                                            search,
                                            page,
                                        },
                                      timeout: 6000 * 30 

                                });

        const next_page = 
            response.data.next_page_url
            ?
            (response.data.current_page + 1).toString()
            :
            null

        return {
            data: response.data.data,
            next_page,
            total: response.data.total
        }
        
    }
    catch(err) {
        console.log((err as AxiosError).request);
        return Promise.reject(false);
    }

}