import { ChipItem, PaperSegmentedButtonItem } from './../../types/shared';
import { ImageResult } from 'expo-image-manipulator';
import { ImagePickerAsset, ImagePickerResult, ImagePickerSuccessResult } from './../../node_modules/expo-image-picker/build/ImagePicker.types.d';
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";
import { useTheme } from 'react-native-paper';

export function buildEmptyObject<T extends Record<string, string|string[]>>(obj: any): T
{
    const typedObject: T = 
        Object.entries(obj).map( ([key, value])  => {
            const x = {} as any;
            if(typeof value == 'string')
                x[key] = ''
            else 
                x[key] = [];
            
            return x;
        }) as any as T;

    return typedObject;
}

export function buildQueryParamsString<T,K extends keyof T = keyof T>(params: {key: K, value: string|string[]}[]) {
    
    const stringQueryParm = params.reduce((prev, {key: currentKey, value: currentValue}, index) => {

        const currentKeyAsString = currentKey as string; 

        if(typeof currentValue !== "string")
        {
            
            const query = currentValue.reduce(
                (prevArray, currentArrayItem) => {
                    
                    if(prevArray != "")
                    {
                        return `${prevArray}&${currentKeyAsString}[]=${currentArrayItem}`;
                    }

                    if(index == 0)
                    {
                        return `?${currentKeyAsString}[]=${currentArrayItem}`;
                    }

                    return `${prevArray}&${currentKeyAsString}[]=${currentArrayItem}`;
                }
                , 
                prev
            );

            return query;
        }

        if(currentValue == "")
        {
            
            return prev;
        }

        if(prev == "" && currentValue == "")
            {
                return prev;
            }
    

        if(index == 0)
        {
            if(currentValue != "")
            {
                
                return `?${currentKeyAsString}=${currentValue}`;
            }
        }

        if(prev == "" && currentValue != "")
        {
            return `${prev}&${currentKeyAsString}=${currentValue}`;
        }

        if(prev != "" && currentValue != "")
        {
            return `${prev}&${currentKeyAsString}=${currentValue}`;
        }
        
        return prev;

    }, "");
    
    

    return stringQueryParm;

}



export function rowPartition<T>(items: T[], rowItemsCount: number = 3, maxRowCount: number = 2){

    const numberOfItemsToShowInGrid = (rowItemsCount *  maxRowCount); 
    
    const rowPartitionedItems = items.reduce((prev, current, index) => {
        

        const shouldNotShowRow = index >= numberOfItemsToShowInGrid;

        if(shouldNotShowRow)
        {
            return prev;
        }
        
        if (index % rowItemsCount == 0) {
          prev.push([]);
        }
    
        prev[Math.floor(index / rowItemsCount)].push(current);
    
        return prev;
      }, [] as T[][]);

    const lastRowIndex = rowPartitionedItems.length - 1;

    const isLastRow = (rowIndex: number) => rowIndex === lastRowIndex;
    
    const lastShowableItemIndex = numberOfItemsToShowInGrid - 1;

    const isLastShowableItem = (rowIndex: number, itemIndex: number) => {

        return rowIndex === maxRowCount - 1 && itemIndex === rowItemsCount - 1;

    }

    const numberOfItemsToNotShowInGrid = items.length - numberOfItemsToShowInGrid;

    const shouldShowNumberOfNotShowableItems = (rowIndex: number, itemIndex: number) => {

        // return isLastShowableItem(rowIndex, itemIndex);

     
        
        if(isLastShowableItem(rowIndex, itemIndex))
        {
            if( numberOfItemsToNotShowInGrid === 0)
            {
                return false;
            }
            
            return true;
        }
    }
    
    return {
        rowPartitionedItems,
        lastRowIndex,
        isLastRow,
        lastShowableItemIndex, 
        isLastShowableItem,
        numberOfItemsToNotShowInGrid,
        shouldShowNumberOfNotShowableItems
    } as const;

}

export function getListItemsFirstValue(listItems?: ListItem[], resultType: "string" | "number" | "boolean" = "string")
{
    if(listItems?.length == 0 || listItems == undefined)
    {
        return null
    }

    const resultItem = listItems[0]._id;

    if(resultType === "number")
    {
        return parseInt(resultItem); 
    }

    if(resultType === "boolean")
    {
        return parseInt(resultItem) as unknown as boolean;
    }

    return listItems[0]._id;
}

export function getListItemsFirstValueAsStringOrNull(listItems?: ListItem[])
{
    if(listItems?.length == 0 || listItems == undefined)
    {
        return null
    }

    const resultItem = listItems[0]._id;

    return resultItem;

}

export function getListItemsFirstValueAsString(listItems?: ListItem[])
{
    return getListItemsFirstValueAsStringOrNull(listItems) as string;
}

export function getListItemsFirstValueAsNumberOrNull(listItems?: ListItem[])
{
    if(listItems?.length == 0 || listItems == undefined)
    {
        return null
    }

    const resultItem = listItems[0]._id;

    return parseInt(resultItem);

}

export function getListItemsFirstValueAsNumber(listItems?: ListItem[])
{
    return getListItemsFirstValueAsNumberOrNull(listItems) as number;

}

export function getListItemsFirstValueAsBooleanOrNull(listItems?: ListItem[])
{
    if(listItems?.length == 0 || listItems == undefined)
    {
        return null
    }

    const resultItem = listItems[0]._id;

    return parseInt(resultItem) as unknown as boolean;

}

export function getListItemsFirstValueAsBoolean(listItems?: ListItem[])
{
    return getListItemsFirstValueAsBooleanOrNull(listItems) as boolean;

}

export function getSelectListItemStringValue(items: ListItem[])
{
    return items?.length > 0 ? items[0].value : "";
}

// export function getEnumSelectListByLookUp<T extends number>(enumLookup: Record<T, string>): ListItem[] {
//     const entries = Object.keys(T) as string[];

    
//     const keys = entries.splice(0, entries.length / 2) as string[];
    
    
    
//     return
//         (Object.values(keys))
//         .map<ListItem>((city, index) => ({_id: city, value: enumLookup[city.toString()]}));
        
// }


export function GetReactPaperListItemsListByObject(obj: Record<string, string>) {
    
    const listItems: ListItem[] = Object.entries(obj).map( ([key, value]) => {
        const item: ListItem = {
            _id: key,
            value
        }
        return item;
    } );

    return listItems
    
}

export function GetReactPaperChipItemsByObject(obj: Record<string, string>) {
    
    const listItems: ChipItem[] = Object.entries(obj).map( ([key, value]) => {
        const item: ChipItem = {
            id: key,
            name: value
        }
        return item;
    } );

    return listItems
    
}

export function GetReactPaperSegmentedButtonsByObject(obj: Record<string, string>) {
    
    const listItems: PaperSegmentedButtonItem[] = Object.entries(obj).map( ([key, value]) => {
        const item = {
            label: value,
            value: key
        }
        return item;
    } );

    return listItems
    
}

export function GetReactPaperSegmentedButtonsWithUnSpecifedOptionByObject(obj: Record<string, string>) {
    
    const listItems = GetReactPaperSegmentedButtonsByObject(obj);

    return [...listItems, {value: "", label: "غير محدد"}];
    
}

export function getListItemFromString(listItems: ListItem[], value: string)
{
    return listItems.filter(item => item._id === value)!;
}

export function getListItemsFromStringArray(listItems: ListItem[], values: string[])
{
    // const ids = listItems.map(x => x._id); 
    return listItems.filter(item => values.includes(item._id));
}

export function getStringValueFromListItems(listItems: ListItem[], value: string) {

    return listItems.find(item => item._id === value)?.value || '';
}

export function getStringListValuesFromListItems(listItems: ListItem[], values: string[]) {

    return listItems.filter(item => values.includes(item._id)).map(item => item.value) || [];
}


export function getPaperSelectListItemsText (listItems: ListItem[], items: string[]) {

    const values = getStringListValuesFromListItems(listItems, items);

    const itemsLength = values.length;

    const lastItemIndex  = itemsLength - 1;

    const lastItem = values[itemsLength - 1];

    const numberOfValuesToShow = 3;
    
    return values.reduce((prev, current, index) => {
        if (index < numberOfValuesToShow) {

          if(index === lastItemIndex || index === numberOfValuesToShow - 1)
          {
            return prev + current; 
          }

          return prev + current + ", ";
        }
        if(index === numberOfValuesToShow)
        {
          const extraItems = (itemsLength - numberOfValuesToShow).toString();
          const extraString = "  +" + extraItems; 
          return prev + extraString;
        }
        return prev;
      }, "")
    

}

export function getStringValueFromSegmentedButtonsList(items: PaperSegmentedButtonItem[], value: string) {
    return items.find(item => item.value === value)?.value || '';
}


export function  getFormDataFromImages( assets:  ImagePickerAsset[]) {
    
    const formData = new FormData();

    assets.forEach((asset, index) => {
        formData.append(`files[${index}]`,
             {
                ...asset,
                 name: asset.fileName, 
                size: asset.fileSize, // we can omit and request will still work
            } as unknown as Blob
        );
    });

    return formData;
}