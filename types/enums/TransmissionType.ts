import { GetReactPaperListItemsListByObject, GetReactPaperSegmentedButtonsWithUnSpecifedOptionByObject } from "@/libs/axios/helpers";
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface"


export const TRANSMISSION = {
  '1': 'أوتوماتيك',
  '2': 'عادي',
} as const;

export const TRANSMISSIONLIST: ListItem[] = 
  GetReactPaperListItemsListByObject(TRANSMISSION);

export const TRANSMISSIONSEGMENTEDBUTTONS = 
  GetReactPaperSegmentedButtonsWithUnSpecifedOptionByObject(TRANSMISSION);

  export type TransmissionKey = keyof typeof TRANSMISSION;
  
  export const TRANSMISSIONLOOKUP = (value: number|string) => {
  
    return value ? TRANSMISSION[value.toString() as TransmissionKey] : '';
  }

// export const TRANSMISSIONLIST: ListItem[] = [
//   {
//     _id: '1',
//     value: 'أوتوماتيك'
//   },
//   {
//     _id: '2',
//     value: 'عادي'
//   },
// ]

// export enum TransmissionType {

//     Automatic = 1,
//     Manual,

// }
// export const TRANSMISSIONTYPELOOKUP: Record<TransmissionType, string> = {
//     [TransmissionType. Automatic]: 'أتوماتيك',
//     [TransmissionType.Manual]: 'عادي',
// }

