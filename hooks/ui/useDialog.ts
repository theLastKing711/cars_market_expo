import { useState } from "react";
import { measure } from "react-native-reanimated";

export const useDialog = () => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogText, setDialogText] = useState('');
    

    const closeDialog = () => {
        setIsDialogOpen(false);
    }


    const openDialog = (message?: string) => {
        setIsDialogOpen(true);
        if(message)
        {
            setDialogText(message);
        }
    }



    return {
        isDialogOpen,
        closeDialog,
        openDialog,
        dialogText,
    }
}