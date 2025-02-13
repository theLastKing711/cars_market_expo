import { useTheme } from 'react-native-paper';

export function useGenericChipFilter(selectedItems: string[]|string) {
    const theme = useTheme();

 const getChipBackgroundColor = (id: string) => {

    if (isChipItemSelected(id)) {
    //   return theme.colors.primary;
      return theme.colors.primaryContainer;

    }
    return theme.colors.secondaryContainer;

    // return theme.colors.secondary;
  };

 const getChipColor = (id: string) => {
    if (isChipItemSelected(id)) {
    // return theme.colors.onPrimary;
        return theme.colors.primary;

    }
        return theme.colors.secondary;

    // return theme.colors.onSecondary;
};

const isSelectedListEmpty = selectedItems.length == 0;


const isDefaultEmptyItem = (id: string) => {
    return id === "";
}



 const isChipItemSelected = (id: string) => {

    if(typeof selectedItems === "string")
    {
        return selectedItems === id;
    }
    
    if(isDefaultEmptyItem(id))
    {
        if(isSelectedListEmpty)
            return true;
        
        return false;
    }

    const selectedListHasItem = selectedItems.includes(id); 

    return selectedListHasItem;

};
    
const selectChipItem = (id: string, onChipItemSelected: (id: string) => void) => {
    if(isDefaultEmptyItem(id))
    {
        if(isSelectedListEmpty)
        {
            return;
        }
    }
    onChipItemSelected(id);
}

    return {
        theme,
        getChipBackgroundColor,
        getChipColor,
        selectChipItem,
        isChipItemSelected,
    }
    
}
