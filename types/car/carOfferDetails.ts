import { SyrianCityKey } from '../enums/SyrianCity';
import { TransmissionKey } from '../enums/TransmissionType';
// import { FuelType } from '../enums/FuelType';
import { ShippableToCityData } from '../home';
import { MediaData } from '../shared';
export type CarOfferDetailsRespnseData = {
    id: number;
    manufacturer_name_en: string | null;
    name_ar: string | null;
    year_manufactured: number | null;
    car_price: number | null;
    car_label_origin: number | null;
    // car_import_type: ImportType | null;
    miles_travelled_in_km: number | null;
    is_new_car: boolean | null;
    fuel_type: number | null;
    car_sell_location: SyrianCityKey | null;
    is_kassah: boolean | null;
    is_khalyeh: boolean | null;
    is_faragha_jahzeh: boolean | null;
    is_favourite: boolean;
    shippable_to: Array<ShippableToCityData>;
    images:  Array<MediaData>;
    transmission: TransmissionKey | null;
    phone_number: string;
};