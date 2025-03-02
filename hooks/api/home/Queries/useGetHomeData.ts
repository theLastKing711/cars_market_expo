import { HOME_URI } from '@/constants/api';
import { maximum_price_to, maximumm_miles_travelled_in_km_to, minimum_miles_travelled_in_km_from, minimum_price_from } from '@/constants/variables';
import { apiClient } from "@/libs/axios/config";
import useCarSearchStore, { UseCarSearchStoreParams } from '@/state/useCarSearchStore';
import {SearchCarOfferPaginationResultData } from "@/types/home";
import { InifinteQueryPageParam } from '@/types/shared';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { AxiosError } from 'axios';

var qs = require('qs');

export function useGetHomeData() {

    const {
        params: {
            car_label_origin,
            car_sell_location,
            fuel_type,
            import_type,
            is_faragha_jahzeh,
            is_kassah,
            is_khalyeh,
            is_new_car,
            miles_travelled_in_km_from,
            miles_travelled_in_km_to,
            page,
            price_from,
            price_to,
            search,
            shippable_to,
            transmission,
            user_current_syrian_city,
            user_has_legal_car_papers,
            year_manufactured,
        },
        updateCarSearchParam,
        updateCarSellLocationQueryParam,
        updateShippableToQueryParam,
        emptyCarSellLocationQueryParam,
        emptyShippableToQueryParam,
    } = useCarSearchStore((state) => state);

    // value get changed after 1.5 second if user stopped changing query param(typing here)
    // which trigger the useQuery re-run with new value
    // it gets updated value  after 1000 (1 second)
    const debouncedSearchTerm = useDebounce(search, 1000);

    console.log("search", search);

    console.log("search debounced", debouncedSearchTerm);

    const debouncedPriceFrom = useDebounce(price_from, 500);

    const debouncedPriceTo = useDebounce(price_to, 500);

    const debouncedKmFrom = useDebounce(miles_travelled_in_km_from, 500);
    
    const debouncedKmTo = useDebounce(miles_travelled_in_km_to, 500);
    


    //must be called manually in view

    // //must be called manually in view
    const {data, isLoading, hasNextPage, isFetching, fetchNextPage} = useInfiniteQuery(
        {
            //if one of debounced parameters change,then re-run the query with updated values
            //(enabled must be true also => one of the values in not empty)
            // queryKey: ['home', debouncedSearchTerm, debouncedPaginationCursor],
            queryKey: 
                [
                    'home',
                    debouncedSearchTerm,
                    debouncedPriceFrom,
                    debouncedPriceTo,
                    shippable_to,
                    car_label_origin,
                    car_sell_location,
                    fuel_type,
                    import_type,
                    is_new_car,
                    is_faragha_jahzeh,
                    is_khalyeh,
                    is_kassah,
                    transmission,
                    debouncedKmFrom,
                    debouncedKmTo,
                    user_has_legal_car_papers,
                    user_current_syrian_city,
                    year_manufactured,
                ],
            // page param is in the defenition of queryfn and it takes its type from initalPageParam as seen below
            queryFn :({pageParam}) => getSearchSuggestionsApi({
                search,
                page: pageParam || '',
                car_label_origin,
                car_sell_location,
                fuel_type,
                import_type,
                is_new_car,
                is_faragha_jahzeh,
                is_khalyeh,
                is_kassah,
                transmission,
                miles_travelled_in_km_from,
                miles_travelled_in_km_to,
                price_from,
                price_to,
                user_has_legal_car_papers,
                user_current_syrian_city,
                year_manufactured,
                shippable_to
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
        page,
        car_label_origin,
        car_sell_location,
        fuel_type,
        import_type,
        miles_travelled_in_km_from,
        miles_travelled_in_km_to,
        price_from,
        price_to,
        shippable_to,
        user_current_syrian_city,
        user_has_legal_car_papers,
        year_manufactured,
        is_new_car,
        is_faragha_jahzeh,
        is_khalyeh,
        is_kassah,
        transmission,
        fetchNextPage,
        updateCarSearchParam,
        updateShippableToQueryParam,
        emptyShippableToQueryParam,
        emptyCarSellLocationQueryParam,
        updateCarSellLocationQueryParam
    }
    
}
  
async function getSearchSuggestionsApi({
    page,
    search,
    car_label_origin,
    car_sell_location,
    fuel_type,
    import_type,
    miles_travelled_in_km_from,
    miles_travelled_in_km_to,
    price_from,
    price_to,
    user_current_syrian_city,
    user_has_legal_car_papers,
    year_manufactured,
    shippable_to,
    is_new_car,
    is_faragha_jahzeh,
    is_khalyeh,
    is_kassah,
    transmission,
}: UseCarSearchStoreParams) {
    try {

        const search_url = `${HOME_URI}`;

        const are_miles_travelled_unchanged = 
            miles_travelled_in_km_from == minimum_miles_travelled_in_km_from.toString()
            &&
            miles_travelled_in_km_to == maximumm_miles_travelled_in_km_to.toString();

        const are_prices_unchanged = 
            price_from == minimum_price_from.toString()
            &&
            price_to == maximum_price_to.toString(); 

        const response = await apiClient
                                .get<SearchCarOfferPaginationResultData>
                                (
                                    search_url, {
                                        params: {
                                            search,
                                            page,
                                            car_label_origin,
                                            car_sell_location: car_sell_location == "-1" ? "" : car_sell_location,
                                            fuel_type,
                                            import_type,
                                            miles_travelled_in_km_from: are_miles_travelled_unchanged ? '' : miles_travelled_in_km_from,
                                            miles_travelled_in_km_to: are_miles_travelled_unchanged ? '' : miles_travelled_in_km_to,
                                            price_from: are_prices_unchanged ? '' : price_from,
                                            price_to: are_prices_unchanged ? '' : price_to,
                                            user_current_syrian_city,
                                            user_has_legal_car_papers,
                                            year_manufactured,
                                            // shippable_to: query_shippable_to.split(','),
                                            shippable_to,
                                            is_new_car,
                                            is_faragha_jahzeh,
                                            is_khalyeh,
                                            is_kassah,
                                            transmission
                                        },
                                    paramsSerializer: params => {
                                        return qs.stringify(params)
                                      },
                                      timeout: 6000 * 30 

                                });

        const next_page = 
            response.data.next_page_url
            ?
            (response.data.current_page + 1).toString()
            :
            null

        console.log("data result", response.data.data);

            
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