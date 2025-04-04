import { UseCarSearchStoreParams } from "@/state/useCarSearchStore";
import { CarSearchFilterChipItem } from "@/types/shared";

export const [minimum_price_from, maximum_price_to] = [0, 100000];

export const [minimum_miles_travelled_in_km_from, maximumm_miles_travelled_in_km_to] = [0, 1000000];

const carFilterLookup =  {
    search: "السيارة",
    car_label_origin: "الآرمة",
    car_sell_location: "تواجد",
    fuel_type: "نوع الناقل",
    import_type: "استيراد",
    is_faragha_jahzeh: "جاهزة للفراغة",
    is_kassah: "مقضوصة",
    is_khalyeh: "خالبة العلام",
    is_new_car: "جديدة",
    miles_travelled_in_km_from: "قاطعة من",
    miles_travelled_in_km_to: "قاطعة لحد",
    price_from: "السعر من",
    price_to: "السعر لحد",
    transmission: "نوع الناقل",
} as const;

export const getCarFilterChipList =(items: {key: keyof typeof carFilterLookup, text: string | boolean, onClose: () => void, suffix?: string}[]) => {
    
    const result: CarSearchFilterChipItem[] = 
    items
        .filter(item => item.text != '')
        .map(({ key, text, onClose, suffix}) => {

            const suffixText =  suffix ? ` ${suffix}` : '';
            
            if(typeof text == "boolean")
            {
                if(text === false)
                {
                    return {
                        id: key,
                        text: `غير ${carFilterLookup[key]}`,
                        onClose 
                    }
                }
                return {
                    id: key,
                    text: `${carFilterLookup[key]}`,
                    onClose 
                }
            }
                return {
                    id: key,
                    text:  `${carFilterLookup[key]} ${text}${suffixText}`,
                    onClose 
                }
            
        })

    return result;
    
}
