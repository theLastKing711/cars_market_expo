import { create } from "zustand";

export type SnackBarStatus = "success" | "error";

export type SnackBarPosition = "center" | "top" | "bottom";

const emptyState: UseSnackBarStoreParams = {
    isSnackBarOpen: false,
    snackBarText: "",
    status: "success",
    position: "bottom",
}


export type UseSnackBarStoreParams = {
    isSnackBarOpen: boolean;
    snackBarText: string;
    status: SnackBarStatus;
    position: SnackBarPosition;
};

export type UseSnackBarStoreState = {
    params: UseSnackBarStoreParams;
    openSnackBarSuccess: (message: string, position?: SnackBarPosition) => void,
    openSnackBarError: (message: string, position?: SnackBarPosition) => void,
    closeSnackBar: () => void,
}

const useSnackBarStore = create<UseSnackBarStoreState>((set, state) => ({
    params: emptyState,
    openSnackBarSuccess: (message: string ,position: SnackBarPosition = "bottom") => {
        set(state => {
            return ({
                ...state,
                params: {
                    ...state.params,
                    isSnackBarOpen: true,
                    snackBarText: message,
                    status: "success",
                    position
                }
            })
        });

    },
    openSnackBarError: (message: string,position: SnackBarPosition = "bottom") => {
        set(state => {
            return ({
                ...state,
                params: {
                    ...state.params,
                    isSnackBarOpen: true,
                    snackBarText: message,
                    status: "error", 
                    position
                }
            })
        });

    },
    closeSnackBar: () => {
        set(state => {
            return ({
                ...state,
                params: {
                    ...emptyState,
                    isSnackBarOpen: false
                }
            })
        });

    },
}));


export default useSnackBarStore;