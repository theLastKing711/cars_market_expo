import { SyrianCityKey } from "../enums/SyrianCity";
import { MediaData, PaginationResultData } from "../shared";

export type SearchMyCarQueryParameterData = {
    page: string;
    search: string;
}


export type SearchMyCarData = {
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
    image: MediaData;
    views: number;
};


export type SearchMyCarPaginationResultData 
    = PaginationResultData<SearchMyCarData>;