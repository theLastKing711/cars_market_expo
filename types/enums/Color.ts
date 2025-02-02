// export enum Color {

import { GetReactPaperListItemsListByObject } from "@/libs/axios/helpers";
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";

//     White = 1,
//     Yellow,
//     Red,
//     Pink,
//     Blue,
//     Gray,
//     Black,
//     Orange,
//     Purple,
//     Brown,
//     Silver,
//     Gold,
//     Indigo,

// }

export const COLOR = {
  '1': 'أبيض',
  '2': 'أصفر',
  '3': 'أحمر',
  '4': 'زهري',
  '5': 'أزرق',
  '6': 'رمادي',
  '7': 'أسود',
  '8': 'برتقالي',
  '9': 'بنفسجي',
  '10': 'بني',
  '11': 'فضي',
  '12': 'ذهبي',
  '13': 'نيلي'
} as const;

export const COLORLIST: ListItem[] = 
  GetReactPaperListItemsListByObject(COLOR);

// export const COLORLOOKUP: Record<Color, string> = {
//         [Color.White]:  'أبيض',
//         [Color.Yellow]:  'أصفر',
//         [Color.Red]:  'أحمر',
//         [Color.Pink]:  'زهري',
//         [Color.Blue]:  'أزرق',
//         [Color.Gray]:  'رمادي',
//         [Color.Black]:  'أسود',
//         [Color.Orange]:  'برتقالي',
//         [Color.Purple]:  'بنفسحي',
//         [Color.Brown]:  'بني',
//         [Color.Silver]: 'فصي',
//         [Color.Gold]:  'ذهبي',
//         [Color.Indigo]:  'نيلي'
// }

