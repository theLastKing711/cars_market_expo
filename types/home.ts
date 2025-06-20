import {  SyrianCityKey } from '@/types/enums/SyrianCity';
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import { MediaData, PaginationResultData } from "./shared";

export type CarListData = {
    id: number;
    name_ar: string | null;
    car_price: number | null;
    miles_travelled_in_km: number | null;
    fuel_type: number | null;
    car_sell_location: SyrianCityKey | null,
    is_kassah: boolean | null;
    is_khalyeh: boolean | null;
    is_faragha_jahzeh: boolean | null;
    is_new_car: boolean | null;
    // shippable_to: Array<ShippableToCityData>; 
    is_favourite?: boolean;
    image: MediaData;
};

export type ManufacturerListResponseData = {
    name_ar: string;
    name_en: string;
    logo: string;
};

export type SearchCarOfferPaginationResultData = 
 PaginationResultData<CarListData>;


export type SearchCarOfferResponseData = {
    paginated_cars_search_result: SearchCarOfferPaginationResultData;
    user_city_cars: Array<any>;
};
export type ShippableToCityData = {
    city: SyrianCityKey;
};
//? in page? mean it is a query search param
//without it, it the variable becomes a route parameter
//i.e user/[page]
export type SearchCarOfferQueryParameterData = {
    page?:string;
    search?: string;
    user_current_syrian_city?: string;
    price_from?: string;
    price_to?: string;
    car_sell_location?: string;
    year_manufactured?: string;
    car_label_origin?: string;
    miles_travelled_in_km_from?: string;
    miles_travelled_in_km_to?: string;
    user_has_legal_car_papers?: string;
    import_type?: string;
    fuel_type?: string;
    shippable_to?: string | Array<string>;
    transmission?: string;
    is_new_car?: string;
    is_faragha_jahzeh?: string;
    is_khalyeh?: string;
    is_kassah?: string;
};


export type RequiredSearchCarOfferQueryParameterData = 
    Required<SearchCarOfferQueryParameterData>;

export type SearchState = {
    page: ListItem[];
    search: ListItem[];
    user_current_syrian_city: ListItem[];
    price_from: string;
    price_to: string;
    car_sell_location: string;
    year_manufactured: string;
    car_label_origin: string;
    miles_travelled_in_km_from: string;
    miles_travelled_in_km_to: string;
    user_has_legal_car_papers: string;
    faragha_jahzeh: string;
    import_type: string;
    fuel_type: ListItem[];
    shippable_to: string;
    transmission: ListItem[];
    is_faragha_jahzeh: ListItem[];
    is_khalyeh: ListItem[];
};