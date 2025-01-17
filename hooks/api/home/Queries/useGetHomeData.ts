import { HOME_URI } from '@/constants/api';

// NOTE: The default React Native styling doesn't support server rendering.
// Server rendered styles should not change between the first render of the HTML
// and the first render on the client. Typically, web developers will use CSS media queries
// to render different styles on the client and server, these aren't directly supported in React Native

import { apiClient } from "@/libs/axios/config";
import { buildQueryParamsString } from '@/libs/axios/helpers';
import { SearchCarOfferPaginationResultData, SearchOfferQueryParameterData } from "@/types/home";
import { InifinteQueryPageParam } from '@/types/shared';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { useState } from "react";


const emptySearchQuery: SearchOfferQueryParameterData = {
    search: '',
    page: '',
    car_label_origin: '',
    car_sell_location: '',
    faragha_jahzeh: '',
    fuel_type: '',
    import_type: '',
    manufacturer_id: '',
    miles_travelled_in_km: '',
    miles_travelled_in_km_from: '',
    miles_travelled_in_km_to: '',
    price_from: '',
    price_to: '',
    year_manufactured: '',
    user_current_syrian_city: '',
    user_has_legal_car_papers: '',
    is_used: '',
    shippable_to: [],
}

export function useGetHomeData() {
    
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    
    const onSearchFocus = () => {
        setIsSearchFocused(true);
    };

    const onSearchBlur = () => {
        setIsSearchFocused(false);
    };

    const { 
        search,
        page,
        car_label_origin,
        car_sell_location,
        faragha_jahzeh,
        fuel_type,
        import_type,
        manufacturer_id,
        miles_travelled_in_km,
        miles_travelled_in_km_from,
        miles_travelled_in_km_to,
        price_from,
        price_to,
        user_current_syrian_city,
        user_has_legal_car_papers,
        year_manufactured,
        is_used,
        shippable_to,
     } =
     useLocalSearchParams<SearchOfferQueryParameterData>();

    const onSearchValueUpdate = (value: string) => {
        router.setParams(
            {
                ...emptySearchQuery,
                search: value,
            }
            
        );
    }

    const onPageValueUpdate = (next_page: string) => {
        router.setParams({page: next_page})
    }

    // value get changed after 1.5 second if user stopped changing query param(typing here)
    // which trigger the useQuery re-run with new value
    const debouncedSearchTerm = useDebounce(search, 1500);

    const debouncedPaginationCursor = useDebounce(search, 1000);

    const shouldSearch = !!debouncedSearchTerm || !!debouncedPaginationCursor;
    
    //must be called manually in view
    const {data, isLoading, hasNextPage, fetchNextPage} = useInfiniteQuery(
        {
            //if one of debounced parameters change,then re-run the query with updated values
            //(enabled must be true also => one of the values in not empty)
            queryKey: ['home', debouncedSearchTerm, debouncedPaginationCursor],
            // page param is in the defenition of queryfn and it takes its type from initalPageParam as seen below
            queryFn :({pageParam}) => getSearchSuggestionsApi({
                search,
                page: pageParam || '',
                car_label_origin,
                car_sell_location,
                faragha_jahzeh,
                fuel_type,
                import_type,
                manufacturer_id,
                miles_travelled_in_km,
                miles_travelled_in_km_from,
                miles_travelled_in_km_to,
                price_from,
                price_to,
                user_has_legal_car_papers,
                user_current_syrian_city,
                year_manufactured,
                is_used,
                shippable_to,
            }),
            enabled: shouldSearch,
            getNextPageParam: (lastPageParam, pages) => {
                const nextPage = lastPageParam?.next_page ? lastPageParam?.next_page.toString() : undefined; 

                return nextPage;
            },
            initialPageParam: null as InifinteQueryPageParam['pageParam'],
        },
    );

    return {
        data,
        isLoading,
        hasNextPage,
        search,
        page,
        car_label_origin,
        car_sell_location,
        faragha_jahzeh,
        fuel_type,
        import_type,
        manufacturer_id,
        miles_travelled_in_km,
        miles_travelled_in_km_from,
        miles_travelled_in_km_to,
        price_from,
        price_to,
        shippable_to,
        user_current_syrian_city,
        user_has_legal_car_papers,
        year_manufactured,
        fetchNextPage,
        onSearchFocus,
        onSearchBlur,
        onSearchValueUpdate,
        onPageValueUpdate 
    }
    
}
  
async function getSearchSuggestionsApi({
    page,
    search,
    car_label_origin,
    car_sell_location,
    faragha_jahzeh,
    fuel_type,
    import_type,
    manufacturer_id,
    miles_travelled_in_km,
    miles_travelled_in_km_from,
    miles_travelled_in_km_to,
    price_from,
    price_to,
    user_current_syrian_city,
    user_has_legal_car_papers,
    year_manufactured,
    is_used,
    shippable_to,
}: SearchOfferQueryParameterData) {
    try {
        
        const queryString = 
        buildQueryParamsString<SearchOfferQueryParameterData>(
            [
                {key: "search", value: search},
                {key: "page", value: page || ''},
                {key: "car_label_origin", value: car_label_origin},
                {key: "car_sell_location", value: car_sell_location},
                {key: "faragha_jahzeh", value: faragha_jahzeh}, 
                {key: "fuel_type", value: fuel_type},
                {key: "import_type", value: import_type},
                {key: "manufacturer_id", value: manufacturer_id},
                {key: "miles_travelled_in_km", value: miles_travelled_in_km}, 
                {key: "miles_travelled_in_km_from", value: miles_travelled_in_km_from},
                {key: "miles_travelled_in_km_to", value: miles_travelled_in_km_to},
                {key: "price_from", value: price_from},
                {key: "price_to", value: price_to},
                {key: "user_current_syrian_city", value: user_current_syrian_city},
                {key: "user_has_legal_car_papers", value: user_has_legal_car_papers},
                {key: "year_manufactured", value: year_manufactured},
                {key: "is_used", value: is_used},
                {key: "shippable_to", value: shippable_to},

            ]
        );

        const search_url = `${HOME_URI}/${queryString}`;
        
        const response = await apiClient
                                .get<SearchCarOfferPaginationResultData>
                                (search_url);
        console.log('next page url', response.data.next_page_url);
        

        const next_page = 
            response.data.next_page_url
            ?
            (response.data.current_page + 1).toString()
            :
            null

        console.log(next_page, next_page);
        

        return {
            data: response.data.data,
            next_page,
            // total: 10
        }
        
    }
    catch(err) {
        return Promise.reject(false);
    }

}