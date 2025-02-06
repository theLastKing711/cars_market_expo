import { GetReactPaperListItemsListByObject, GetReactPaperSegmentedButtonsWithUnSpecifedOptionByObject } from "@/libs/axios/helpers";
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";

const FUELTYPE = {
  '1': 'بنزين',
  '2': 'ديزل',
  '3': 'كهرباء',
} as const;

export const FUELTYPELIST: ListItem[] = 
  GetReactPaperListItemsListByObject(FUELTYPE);


export const FUELTYPELISTSEGMENTEDBUTTONS = 
GetReactPaperSegmentedButtonsWithUnSpecifedOptionByObject(FUELTYPE);
  
// export const FUELTYPELIST: ListItem[] = [
//   {
//     _id: '1',
//     value: 'بنزين'
//   },
//   {
//     _id: '2',
//     value: 'ديزل'
//   },
//   {
//     _id: '3',
//     value: 'كهرباء'
//   }
// ]

// // export enum FuelType {
//     Benzene = 1,
//     Diesel =  2,
//     Electricity = 3,
//   }
  
// export const FUELTYPELOOKUP: Record<FuelType, string> = {
//     [FuelType.Benzene]: "بنزين",
//     [FuelType.Diesel]: "ديزل",
//     [FuelType.Electricity]: "كهرباء",
// }
// const entries = Object.keys(FuelType) as string[];

// const keys = entries.splice(0, entries.length / 2) as string[];
// export const FUELTYPELIST = 
//     (Object.values(keys))
//     .map<ListItem>((city, index) => ({_id: city, value: FUELTYPELOOKUP[(city as unknown as FuelType)]}));
