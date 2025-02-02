import { ImageResult } from 'expo-image-manipulator';
import { ImagePickerAsset, ImagePickerResult, ImagePickerSuccessResult } from './../../node_modules/expo-image-picker/build/ImagePicker.types.d';
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";

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

                    console.log(prevArray);
                    
                    
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
            console.log('empty');
            
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
                console.log(currentValue, "sex");
                
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
    
    console.log(stringQueryParm, 'stringQueryParam');
    

    return stringQueryParm;

}



export function rowPartition<T>(items: T[], rowItemsCount: number = 2){

    
    const rowPartitionedItems = items.reduce((prev, current, index) => {
        if (index % rowItemsCount == 0) {
          prev.push([]);
        }
    
        prev[Math.floor(index / rowItemsCount)].push(current);
    
        return prev;
      }, [] as T[][]);

    const lastRowIndex = rowPartitionedItems.length - 1;

    const isLastRow = (rowIndex: number) => rowIndex === lastRowIndex;
    
    return {rowPartitionedItems, lastRowIndex, isLastRow} as const;

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

export function getSelectListItemValue(items: ListItem[])
{
    return items?.length > 0 ? items[0].value : "";
}

// export function getEnumSelectListByLookUp<T extends number>(enumLookup: Record<T, string>): ListItem[] {
//     const entries = Object.keys(T) as string[];

//     console.log(entries);
    
//     const keys = entries.splice(0, entries.length / 2) as string[];
    
//     console.log(keys[0]);
    
    
//     return
//         (Object.values(keys))
//         .map<ListItem>((city, index) => ({_id: city, value: enumLookup[city.toString()]}));
        
// }


export function GetReactPaperListItemsListByObject(obj: Record<string, string>) {

    const x = {id: 25};
    
    const listItems: ListItem[] = Object.entries(obj).map( ([key, value]) => {
        const item: ListItem = {
            _id: key,
            value
        }
        return item;
    } );

    return listItems
    
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


