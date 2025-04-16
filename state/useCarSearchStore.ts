import { create } from "zustand";
const emptySearchQuery: UseCarSearchStoreParams = {
    search: '',
    page: '',
    car_label_origin: '',
    car_sell_location: '',
    fuel_type: '',
    import_type: '',
    is_khalyeh: '',
    is_faragha_jahzeh: '',
    transmission: '',
    miles_travelled_in_km_from: '',
    miles_travelled_in_km_to: '',
    price_from: '',
    price_to: '',
    year_manufactured: '',
    user_current_syrian_city: '',
    user_has_legal_car_papers: '',
    is_kassah: '',
    is_new_car: '',
    shippable_to: [],
}


export type UseCarSearchStoreParams = {
    page:string;
    search: string;
    user_current_syrian_city: string;
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
    shippable_to: string[];
    transmission: string;
    is_new_car: string;
    is_faragha_jahzeh: string;
    is_khalyeh: string;
    is_kassah: string;
};


export type UseCarSearchStoreState = {
    params: UseCarSearchStoreParams;
    updateCarSearchParam: (param: Partial<UseCarSearchStoreParams>) => void;
    updateShippableToQueryParam: (id: string) =>  void;
    emptyShippableToQueryParam: () => void;
    emptyCarSellLocationQueryParam: () => void;
    updateCarSellLocationQueryParam: (id: string) => void;
    resetAllFilters: () => void;
}


const useCarSearchStore = create<UseCarSearchStoreState>((set, state) => ({
    params: emptySearchQuery,
    updateCarSearchParam: (param: Partial<UseCarSearchStoreParams>) => set((state) => ({...state, params: {
        ...state.params, ...param
    }})),
    updateShippableToQueryParam: (id: string) => {
        set(state => {
            const isItemSelectedBefore = state.params.shippable_to.includes(id);
    
            if(isItemSelectedBefore)
            {
                const newList = state.params.shippable_to.filter(item => item != id);
    
                if(newList.length === 0)
                {
                    set(state => {

                        return {
                            ...state,
                            params: {...state.params, shippable_to: []}
                        }
                    }) 
                }
                return {
                    ...state,
                    params: {...state.params, shippable_to: state.params.shippable_to.filter(item => item != id)}
                }

            }
            return {
                ...state,
                params: {...state.params, shippable_to: [...state.params.shippable_to, id]}
            }

        })
    },
    emptyShippableToQueryParam: () => {
        set(state => {

            return {
                ...state,
                params: {...state.params, shippable_to: []}
            }

        }) 
    },
    emptyCarSellLocationQueryParam: () => {
        set(state => {

            return {
                ...state,
                params: {...state.params, car_sell_location: ''}
            }

        }) 
    },
    updateCarSellLocationQueryParam: (id: string) => {
        set(state => {

            const isItemSelectedBefore = state.params.car_sell_location === id;

            return {
                ...state,
                params: {...state.params, car_sell_location: id}
            }

        }) 
    },
    resetAllFilters: () => {
        set(state => ({...state, params: {...emptySearchQuery}}))
    }
}));

export default useCarSearchStore;