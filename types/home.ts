import { SYRIANCITY, SyrianCityKey } from '@/types/enums/SyrianCity';
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import { PagiantionQueryParameter } from "./shared";

export type CarListData = {
    id: number;
    manufacturer_id: number | null;
    manufacturer_name: string | null;
    model: string | null;
    year_manufactured: number | null;
    car_price: number | null;
    // car_import_type: ImportType | null;
    miles_travelled_in_km: number | null;
    is_used: boolean | null;
    fuel_type: number | null;
    car_sell_location: SyrianCityKey | null,
    is_kassah: boolean | null;
    is_khalyeh: boolean | null;
    is_faragha_jahzeh: boolean | null;
    shippable_to: Array<ShippableToCityData>;
};

export type ManufacturerListResponseData = {
    name_ar: string;
    name_en: string;
    logo: string;
};

export type SearchCarOfferPaginationResultData = {
    data: Array<CarListData>;
    current_page: number;
    per_page: number;
    next_page_url: string | null;
    total: number;
};

export type SearchCarOfferResponseData = {
    paginated_cars_search_result: SearchCarOfferPaginationResultData;
    user_city_cars: Array<any>;
};
export type ShippableToCityData = {
    city: SyrianCityKey;
};

export type SearchCarOfferQueryParameterData = {
    page:string;
    model: string;
    search: string;
    user_current_syrian_city: string;
    manufacturer_id: string;
    price_from: string;
    price_to: string;
    car_sell_location: string;
    year_manufactured: string;
    car_label_origin: string;
    miles_travelled_in_km_from: string;
    miles_travelled_in_km_to: string;
    user_has_legal_car_papers: string;
    import_type: string;
    fuel_type: string;
    is_used: string;
    shippable_to: Array<string>;
    transmission: string;
    is_new_car: string;
    is_faragha_jahzeh: string;
    is_khalyeh: string;
    is_kassah: string;
};

export type SearchState = {
    page: ListItem[];
    model: string;
    search: ListItem[];
    user_current_syrian_city: ListItem[];
    manufacturer_id: ListItem[];
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
    is_used: string;
    shippable_to: string;
    transmission: ListItem[];
    is_faragha_jahzeh: ListItem[];
    is_khalyeh: ListItem[];
};

// export type SearchCarOfferQueryParameterData = {
//     search?: string;
//     user_current_syrian_city?: string;
//     manufacturer_id?: string;
//     price_from?: string;
//     price_to?: string;
//     car_sell_location?: string;
//     year_manufactured?: string;
//     fuel_type?: string;
//     car_label_origin?: string;
//     miles_travelled_in_km?: string;
//     miles_travelled_in_km_from?: string;
//     miles_travelled_in_km_to?: string;
//     user_has_legal_car_papers?: string;
//     faragha_jahzeh?: string;
//     import_type?: string;
//     shippable_to?: Array<string>;
// } & PagiantionQueryParameter;
