import { FuelType } from "./enums/FuelType";
import { SyrianCity } from "./enums/SyrianCity";
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
    fuel_type: FuelType | null;
    car_sell_location: SyrianCity | null,
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
}
;
export type ShippableToCityData = {
    city: SyrianCity;
};

export type SearchOfferQueryParameterData = {
    page:string;
    search: string;
    user_current_syrian_city: string;
    manufacturer_id: string;
    price_from: string;
    price_to: string;
    car_sell_location: string;
    year_manufactured: string;
    car_label_origin: string;
    miles_travelled_in_km: string;
    miles_travelled_in_km_from: string;
    miles_travelled_in_km_to: string;
    user_has_legal_car_papers: string;
    faragha_jahzeh: string;
    import_type: string;
    fuel_type: string;
    is_used: string;
    shippable_to: Array<string>;
};

// export type SearchOfferQueryParameterData = {
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
