import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import { getEnglishNumbers, getListItemsFirstValue, getListItemsFirstValueAsBoolean, getListItemsFirstValueAsBooleanOrNull, getListItemsFirstValueAsNumber, getListItemsFirstValueAsNumberOrNull } from "@/libs/axios/helpers";
import { PaperSegmentedButtonItem } from "../shared";

export type CreateCarOfferForm = {
    name_ar: string;
    name_en?: string;
    car_price: string;
    fuel_type?: string;
    transmission?: string;
    miles_travelled_in_km: string;
    is_new_car: string;
    is_faragha_jahzeh?: string;
    is_kassah?: string;
    is_khalyeh?: string;
};

export type CreateCarOfferRequestData = {
    name_ar: string;
    name_en?: string;
    is_new_car: boolean;
    car_price: number;
    fuel_type: number | null;
    transmission: number | null;
    miles_travelled_in_km: number | null;
    is_faragha_jahzeh: boolean | null;
    is_kassah: boolean | null;
    is_khalyeh: boolean | null;
}

export function getCarOfferRequestFromForm({
    car_price,
    fuel_type,
    is_new_car,
    name_ar,
    name_en,
    miles_travelled_in_km,
    is_faragha_jahzeh,
    is_kassah,
    is_khalyeh,
    transmission
}: CreateCarOfferForm) {
    const createCarOfferRequest: CreateCarOfferRequestData = {
        name_ar: name_ar,
        miles_travelled_in_km: getEnglishNumbers(miles_travelled_in_km),
        car_price: getEnglishNumbers(car_price),
        transmission: transmission ? parseInt(transmission): null,
        fuel_type:  1,
        is_faragha_jahzeh: Boolean(is_faragha_jahzeh),
        is_kassah: Boolean(is_kassah),
        is_khalyeh: Boolean(is_khalyeh),
        is_new_car: Boolean(is_new_car),
    }
    
    return createCarOfferRequest;
} 