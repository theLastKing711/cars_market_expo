import { getTokenAsync, setTokenAsync } from "@/libs/axios/secureStorage";
import { create } from "zustand";


const emptyState: UseCarSearchStoreParams = {
 
    phone_number: null,
    token: null,
}


export type UseCarSearchStoreParams = {
    phone_number: string | null;
    token: string | null;
};

export type useAuthStoreState = {
    params: UseCarSearchStoreParams;
    saveToken: (token: string) => Promise<void>;
    getToken: () => Promise<void>;
}


// create the bear store, implementing the BearStore interface
const useAuthStore = create<useAuthStoreState>((set, state) => ({
    // set the initial value in the store to 0 bears
    params: emptyState,
    saveToken: async (token: string) => {

        await setTokenAsync(token);        

        const created_token = await getTokenAsync();
        
        set(state => ({...state, params: {...state.params, token: created_token}}))
    },
    getToken: async () => {

        const token = await getTokenAsync();

        set(state => {

            return ({
                ...state,
                params: {
                    ...state.params,
                    token
                }
            })
            
        })
    }
    
}));


export default useAuthStore;