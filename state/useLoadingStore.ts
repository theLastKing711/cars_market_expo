import { create } from "zustand";

const emptyState: UseLoadingStoreParams = {
    isLoading: false,
    isTransparent: false
}

export type UseLoadingStoreParams = {
    isLoading: boolean;
    isTransparent: boolean
};

export type UseLoadingStoreState = {
    params: UseLoadingStoreParams;
    showTransparentLoading: () => void,
    showLoading: () => void,
    hideLoading: () => void,
    setLoading: (flag: boolean) => void;
    setLoadingTransparent: (flag: boolean) => void;
}

const useLoadingStore = create<UseLoadingStoreState>((set, state) => ({
    params: emptyState,
    showLoading: () => {
        set(state => {
            return ({
                ...state,
                params: {
                    ...state.params,
                   isLoading: true,
                   isTransparent: false
                }
            })
        });
    },
    showTransparentLoading: () => {
        set(state => {
            return ({
                ...state,
                params: {
                    ...state.params,
                   isLoading: true,
                   isTransparent: true
                }
            })
        });
    },
    hideLoading: () => {
        set(state => {
            return ({
                ...state,
                params: {
                    ...state.params,
                   isLoading: false,
                }
            })
        });
    },
    setLoading: (flag: boolean) => {
        set(state => {
            return ({
                ...state,
                params: {
                    ...state.params,
                   isLoading: flag,
                   isTransparent: false
                }
            })
        });
    },
    setLoadingTransparent: (flag: boolean) => {
        set(state => {
            return ({
                ...state,
                params: {
                    ...state.params,
                   isLoading: flag,
                   isTransparent: true
                }
            })
        });
    },
}));


export default useLoadingStore;