import { HOME_URI } from '@/constants/api';
import { maximum_price_to, maximumm_miles_travelled_in_km_to, minimum_miles_travelled_in_km_from, minimum_price_from } from '@/constants/variables';

// NOTE: The default React Native styling doesn't support server rendering.
// Server rendered styles should not change between the first render of the HTML
// and the first render on the client. Typically, web developers will use CSS media queries
// to render different styles on the client and server, these aren't directly supported in React Native

import { apiClient } from "@/libs/axios/config";
import { buildQueryParamsString } from '@/libs/axios/helpers';
import { RequiredSearchCarOfferQueryParameterData, SearchCarOfferPaginationResultData, SearchCarOfferQueryParameterData, SearchState } from "@/types/home";
import { InifinteQueryPageParam } from '@/types/shared';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { AxiosError } from 'axios';
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import { useState } from "react";
import { useTheme } from 'react-native-paper';

var qs = require('qs');

const emptySearchQuery: RequiredSearchCarOfferQueryParameterData = {
    search: '',
    page: '',
    car_label_origin: '',
    car_sell_location: '',
    fuel_type: '',
    import_type: '',
    manufacturer_id: '',
    is_khalyeh: '',
    model: '',
    is_faragha_jahzeh: '',
    transmission: '',
    miles_travelled_in_km_from: '',
    miles_travelled_in_km_to: '',
    price_from: '',
    price_to: '',
    year_manufactured: '',
    user_current_syrian_city: '',
    user_has_legal_car_papers: '',
    is_kassah: '',
    is_new_car: '',
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
        search = '',
        page = '',
        car_label_origin = '',
        car_sell_location = '',
        fuel_type = '',
        import_type = '',
        manufacturer_id = '',
        miles_travelled_in_km_from = minimum_miles_travelled_in_km_from.toString(),
        miles_travelled_in_km_to = maximumm_miles_travelled_in_km_to.toString(),
        price_from = minimum_price_from.toString(),
        price_to = maximum_price_to.toString(),
        user_current_syrian_city = '',
        user_has_legal_car_papers = '',
        year_manufactured = '',
        shippable_to = [],
        model = '',
        is_new_car = '',
        is_faragha_jahzeh = '',
        is_khalyeh = '',
        is_kassah = '',
        transmission = ''
     } =
     useLocalSearchParams<SearchCarOfferQueryParameterData>();

    //  alert(shippable_to);

     const  query_shippable_to: string[] = 
        typeof shippable_to === "string" ? JSON.parse(shippable_to) : shippable_to;
     

    //  const [searchState, setSearchState] = useState<SearchState>({
    //     car_label_origin: '',
    //     car_sell_location: '',
    //     faragha_jahzeh: '',
    //     fuel_type: [],
    //     import_type:'',
    //     is_faragha_jahzeh: [],
    //     is_khalyeh: [],
    //     manufacturer_id: [],
    //     miles_travelled_in_km_from: '',
    //     miles_travelled_in_km_to: '',
    //     model: '',
    //     page: [],
    //     price_from: '',
    //     price_to: '',
    //     search: [],
    //     shippable_to: '',
    //     transmission: [],
    //     user_current_syrian_city: [],
    //     user_has_legal_car_papers: '',
    //     year_manufactured: ''

    //  });

    //  const updateSearchStateItem = (searchStateItem: Partial<SearchState>) => {
    //     const newSearchState = {...searchState, ...searchStateItem}

    //     setSearchState(newSearchState);
    //  };

    //  const updateSearchParams = (searchParam: Partial<SearchCarOfferQueryParameterData>) => {
    //     router.setParams({...})
    //  }
     

    const onSearchValueUpdate = (value: string) => {
        router.setParams(
            {
                ...emptySearchQuery,
                search: value,
            }
            
        );
    };

    const onSearchClicked = () => {

    }

    const onPageValueUpdate = (next_page: string) => {
        router.setParams({page: next_page})
    };

    const updateCarFilterQueryParams = (queryData: Partial<SearchCarOfferQueryParameterData>) => {
        
        router.setParams(queryData);
    }

    const updateShippableToQueryParam = (id: string) => {
        const isItemSelectedBefore = query_shippable_to.includes(id);

        if(isItemSelectedBefore)
        {
            const newList = query_shippable_to.filter(item => item != id);

            if(newList.length === 0)
            {
                updateCarFilterQueryParams(
                    {
                        shippable_to: []
                    }
                ); 
                return;
            }
            
            updateCarFilterQueryParams(
                {
                    shippable_to: query_shippable_to.filter(item => item != id)
                }
            );

            return;
        }
        
        updateCarFilterQueryParams(
            {
                shippable_to: [...query_shippable_to, id]
            }
        );
        
    }
    
    const emptyShippableToQueryParam = () => {
        updateCarFilterQueryParams(
            {
                shippable_to: []
            }
        );
    }

    const emptyCarSellLocationQueryParam = () => {
        updateCarFilterQueryParams(
            {
                car_sell_location: ''
            }
        );
    }

    const updateCarSellLocationQueryParam = (id: string) => {
        const isItemSelectedBefore = car_sell_location === id;

        if(isItemSelectedBefore)
        {
            updateCarFilterQueryParams(
                {
                    car_sell_location: ''
                }
            )
            return;
        }
        
        updateCarFilterQueryParams(
            {
                car_sell_location: id
            }
        )
        
    }

    // value get changed after 1.5 second if user stopped changing query param(typing here)
    // which trigger the useQuery re-run with new value
    const debouncedSearchTerm = useDebounce(search, 1000);

    const debouncedPaginationCursor = useDebounce(search, 1000);

    // const shouldSearch = !!debouncedSearchTerm || !!debouncedPaginationCursor;

    const shouldSearch = !!search  && !!debouncedSearchTerm;

    
    //must be called manually in view
    const {data, isLoading, hasNextPage, isFetching, fetchNextPage} = useInfiniteQuery(
        {
            //if one of debounced parameters change,then re-run the query with updated values
            //(enabled must be true also => one of the values in not empty)
            // queryKey: ['home', debouncedSearchTerm, debouncedPaginationCursor],
            queryKey: 
                [
                    'home',
                    model,
                    price_from,
                    price_to,
                    query_shippable_to,
                    car_label_origin,
                    car_sell_location,
                    fuel_type,
                    import_type,
                    manufacturer_id,
                    is_new_car,
                    is_faragha_jahzeh,
                    is_khalyeh,
                    is_kassah,
                    transmission,
                    miles_travelled_in_km_from,
                    miles_travelled_in_km_to,
                    user_has_legal_car_papers,
                    user_current_syrian_city,
                    year_manufactured,
                ],
            // page param is in the defenition of queryfn and it takes its type from initalPageParam as seen below
            queryFn :({pageParam}) => getSearchSuggestionsApi({
                search,
                model: model || '',
                page: pageParam || '',
                car_label_origin,
                car_sell_location,
                fuel_type,
                import_type,
                manufacturer_id,
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
                shippable_to: query_shippable_to
            }),
            enabled: shouldSearch, // if false it won't fetch data 
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
        manufacturer_id,
        miles_travelled_in_km_from,
        miles_travelled_in_km_to,
        price_from,
        price_to,
        shippable_to: query_shippable_to,
        user_current_syrian_city,
        user_has_legal_car_papers,
        year_manufactured,
        model,
        is_new_car,
        is_faragha_jahzeh,
        is_khalyeh,
        is_kassah,
        transmission,
        fetchNextPage,
        onSearchFocus,
        onSearchBlur,
        onSearchValueUpdate,
        onPageValueUpdate,
        updateCarFilterQueryParams,
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
    manufacturer_id,
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
    model,
    transmission,
}: RequiredSearchCarOfferQueryParameterData) {
    try {

        // const queryString = 
        // buildQueryParamsString<RequiredSearchCarOfferQueryParameterData>(
        //     [
        //         {key: "search", value: search},
        //         {key: "page", value: page || ''},
        //         {key: "car_label_origin", value: car_label_origin},
        //         {key: "car_sell_location", value: car_sell_location},
        //         {key: "fuel_type", value: fuel_type},
        //         {key: "import_type", value: import_type},
        //         {key: "manufacturer_id", value: manufacturer_id},
        //         {key: "miles_travelled_in_km_from", value: miles_travelled_in_km_from},
        //         {key: "miles_travelled_in_km_to", value: miles_travelled_in_km_to},
        //         {key: "price_from", value: price_from},
        //         {key: "price_to", value: price_to},
        //         {key: "user_current_syrian_city", value: user_current_syrian_city},
        //         {key: "user_has_legal_car_papers", value: user_has_legal_car_papers},
        //         {key: "year_manufactured", value: year_manufactured},
        //         {key: "shippable_to", value: shippable_to},
        //         {key: "is_faragha_jahzeh", value: is_faragha_jahzeh},
        //         {key: "is_khalyeh", value: is_khalyeh},
        //         {key: "is_kassah", value: is_kassah},
        //         {key: "is_new_car", value: is_new_car},
        //         {key: "model", value: model},
        //         {key: "transmission", value: transmission},
        //     ]
        // );

        alert("hello world");
        
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
                                            manufacturer_id,
                                            miles_travelled_in_km_from: are_miles_travelled_unchanged ? '' : miles_travelled_in_km_from,
                                            miles_travelled_in_km_to: are_miles_travelled_unchanged ? '' : miles_travelled_in_km_to,
                                            price_from: are_prices_unchanged ? '' : price_from,
                                            price_to: are_prices_unchanged ? '' : price_to,
                                            user_current_syrian_city,
                                            user_has_legal_car_papers,
                                            year_manufactured,
                                            // shippable_to: query_shippable_to.split(','),
                                            shippable_to,
                                            model,
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
        console.log("error");
        console.log((err as AxiosError).request);
        return Promise.reject(false);
    }

}