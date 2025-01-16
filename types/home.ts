import { FuelType } from "./enums/FuelType";
import { PagiantionQueryParameter } from "./shared";

export type CarListData = {
    id: number;
    manufacturer_id: number | null;
    manufacturer_name: string | null;
    model: string | null;
    year_manufactured: number | null;
    car_price: number | null;
    car_import_type: ImportType | null;
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

export type Color = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
export type Currency = 1 | 2;
// export type FuelType = 1 | 2 | 3;
export type Gender = 1 | 2;
export type ImportType = 1 | 2 | 3 | 4 | 5 | 6;
export type Latest = 1;
export type SyrianCity = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64;
export type TransmissionType = 0 | 1;

