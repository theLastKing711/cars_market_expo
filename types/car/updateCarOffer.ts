import { getBooleanFromFormString, getEnglishNumbers } from "@/libs/axios/helpers";

export type UpdateCarOfferForm = {
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

export type UpdateCarOfferRequestData = {
    name_ar: string;
    name_en?: string;
    is_new_car: boolean | null;
    car_price: number;
    fuel_type: number | null;
    transmission: number | null;
    miles_travelled_in_km: number | null;
    is_faragha_jahzeh: boolean | null;
    is_kassah: boolean | null;
    is_khalyeh: boolean | null;
}

export function getUpdateCarOfferRequestFromForm({
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
}: UpdateCarOfferForm) {
    const updateCarOfferRequest: UpdateCarOfferRequestData = {
        name_ar: name_ar,
        miles_travelled_in_km: getEnglishNumbers(miles_travelled_in_km),
        car_price: getEnglishNumbers(car_price),
        transmission: transmission ? parseInt(transmission): null,
        fuel_type:  fuel_type ? parseInt(fuel_type): null,
        is_faragha_jahzeh: getBooleanFromFormString(is_faragha_jahzeh),
        is_kassah: getBooleanFromFormString(is_kassah),
        is_khalyeh: getBooleanFromFormString(is_khalyeh),
        is_new_car: getBooleanFromFormString(is_new_car),
    }
    
    return updateCarOfferRequest;
} 