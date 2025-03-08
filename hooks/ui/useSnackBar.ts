import { useState } from "react";


export type SnackBarStatus = "success" | "error";

export const useSnackBar = () => {

    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false);
    const [text, setText] = useState('');
    const [status, setStatus] = useState<SnackBarStatus>('success');

    const closeSnackBar = () => {
        setIsSnackBarOpen(false);
    }


    const openSnackBar = (text?: string) => {
        setIsSnackBarOpen(true);

        if(text)
        {
            setText(text);
        }
    }

    const openSnackBarSuccess = (text: string) => {
        openSnackBar(text);
        setStatus('success');
    }

    const openSnackBarError = (text: string) => {
        openSnackBar(text);
        setStatus('error');
    }


    return {
        isSnackBarOpen,
        snackBarText: text,
        snackBarStatus: status,
        closeSnackBar,
        openSnackBarSuccess,
        openSnackBarError,
    }
}