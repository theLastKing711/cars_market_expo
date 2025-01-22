/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useState } from 'react';
import { useTheme } from 'react-native-paper';

export function useChipFilter(ids: number[] = []) {
    const theme = useTheme();

    const [selectedItems, setSelectedItems] = useState<number[]>(ids);
  
    const toggleItem = (id: number) => {
      if (isItemSelected(id)) {
        const filteredList = selectedItems.filter((x) => id != x);
        setSelectedItems(filteredList);
      } else {
        setSelectedItems([...selectedItems, id]);
      }
    };
  
    const getBackgroundColor = (id: number) => {
      if (isItemSelected(id)) {
        return theme.colors.primary;
      }
      return theme.colors.secondary;
    };

    const getColor = (id: number) => {
        if (isItemSelected(id)) {
          return theme.colors.onPrimary;
        }
        return theme.colors.onSecondary;
      };

      const isItemSelected = (id: number) => {
        return !!selectedItems.find((x) => x == id);
      };
    

    return {
        getColor,
        getBackgroundColor,
        isItemSelected,
        toggleItem
    }
    
}

