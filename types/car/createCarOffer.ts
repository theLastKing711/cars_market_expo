import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import { getListItemsFirstValue, getListItemsFirstValueAsBoolean, getListItemsFirstValueAsBooleanOrNull, getListItemsFirstValueAsNumber, getListItemsFirstValueAsNumberOrNull } from "@/libs/axios/helpers";

export type CreateCarOfferForm = {
    manufacturer_id: ListItem[];
    manufacturer_name_ar: string;
    manufacturere_name_en: string;
    model?: string;
    is_new_car: ListItem[];
    car_price: string;
    fuel_type: ListItem[];
    transmission?: ListItem[];
    miles_travelled_in_km: string;
    is_faragha_jahzeh?: ListItem[];
    is_kassah?: ListItem[];
    is_khalyeh?: ListItem[];
};

export type CreateCarOfferRequestData = {
    manufacturer_id: number;
    manufacturer_name_ar: string;
    manufacturere_name_en: string;
    model?: string;
    is_new_car: boolean;
    car_price: number;
    fuel_type: number | null;
    transmission: number | null;
    miles_travelled_in_km: number | null;
    is_faragha_jahzeh: boolean | null;
    is_kassah: boolean | null;
    is_khalyeh: boolean | null;
}

export function getCarOfferRequestFromForm(createCarOfferForm: CreateCarOfferForm) {
    const createCarOfferRequest: CreateCarOfferRequestData = {
        manufacturer_id: getListItemsFirstValueAsNumber(createCarOfferForm.manufacturer_id),
        manufacturer_name_ar: createCarOfferForm.manufacturer_name_ar,
        manufacturere_name_en: createCarOfferForm.manufacturere_name_en,
        model: createCarOfferForm.model,
        miles_travelled_in_km: parseInt(createCarOfferForm.miles_travelled_in_km),
        transmission: getListItemsFirstValueAsNumber(createCarOfferForm.transmission),
        fuel_type: getListItemsFirstValueAsNumberOrNull(createCarOfferForm.fuel_type),
        car_price: parseInt(createCarOfferForm.car_price),
        is_faragha_jahzeh: getListItemsFirstValueAsBooleanOrNull(createCarOfferForm.is_faragha_jahzeh),
        is_kassah: getListItemsFirstValueAsBooleanOrNull(createCarOfferForm.is_kassah),
        is_khalyeh: getListItemsFirstValueAsBooleanOrNull(createCarOfferForm.is_khalyeh),
        is_new_car: getListItemsFirstValueAsBoolean(createCarOfferForm.is_new_car),
    }
    
    return createCarOfferRequest;
} 