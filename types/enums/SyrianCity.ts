
// export enum SyrianCity {

import { GetReactPaperListItemsListByObject } from "@/libs/axios/helpers";
import { ListItem } from "react-native-paper-select/lib/typescript/interface/paperSelect.interface";


//     All = 0,
    
//     Aleppo,

//     Damascus,

//     Homs,

//     Hammah,

//     Latakia,

//     Raqqa,

//     DierElZor,

//     AlHasaka,

//     Qamishli,

//     Tartus,

//     Douma,

//     AlSuwayda,

//     Quneitra,

//     AlbuKamal,

//     Afrin,

//     AlAtarib,

//     Azaz,

//     AlBab,

//     Baniyas,

//     Darayya,

//     Duraykish,

//     Fiq,

//     AlHaffah,

//     Izra,

//     Jableh,

//     Jarabulus,

//     JisrAlShughur,

//     MaaratAlNuman,

//     AlMalikiyah,

//     Manbij,

//     Masyaf,

//     Mayadin,

//     Mhardeh,

//     AlMukharram,

//     Qardaha,

//     Qatana,

//     Qudsaya,

//     AlQusayer,

//     AlQutayfah,

//     RasAlAyn,

//     AlRastan,

//     AlSafira,

//     Safita,

//     Salamiyah,

//     Salkhad,

//     AlSanamayn,

//     Salqin,

//     AlShaykhBadr,

//     AlSuqaylabiyah,

//     Tadmur,

//     TellAbyad,

//     Taldou,

//     Talalakh,

//     AlTall,

//     AlThawrah,

//     Yabroud,

//     Zabadani,

//     Daraa,

//     Idleb,

//     Ariha,

//     DayrHafir,

//     AlNabk,

//     AynAlArab,

// }

  export const SYRIANCITY = {
    "0": "حميع المحافظات السورية",
    '1': "حلب",
    '2': "دمشق",
    '3': "حمص",
    '4': "حماة",
    '5': "اللاذقية",
    '6': "الرقة",
    '7': "دير الزور",
    '8': "الحسكة",
    '9': "القامشلي",
    '10': "طرطوس",
    '11': "دوما",
    '12': "إدلب",
    '13': "درعا",
    '14': "السويداء",
    '15': "القنيطرة",
    '16': "البوكمال",
    '17': "عفرين",
    '18': "أريحا",
    '19': "اﻷتارب",
    '20': "عين العرب",
    '21': "عزاز",
    '22': "الباب",
    '23': "بانياس",
    '24': "داريا",
    '25': "دير حافر",
    '26': "دريكيش",
    '27': "فيق",
    '28': "الهفا",
    '29': "أزرع",
    '30': "جبلة",
    '31': "جرابلس",
    '32': "جسر الشغور",
    '33': "معرة النعمان",
    '34': "المالكية",
    '35': "منبج",
    '36': "مصياف",
    '37': "الميادين",
    '38': "مجردة",
    '39': "المخرم",
    '40': "النبك",
    '41': "القرداحة",
    '42': "قطنا",
    '43': "قدسيا",
    '44': "القصير",
    '45': "القطيقة",
    '46': "رأس العين",
    '47': "الرستن",
    '48': "السفيرة",
    '49': "صافيتا",
    '50': "سلمية",
    '51': "صلخد",
    '52': "الصنمين",
    '53': "سلقين",
    '54': "الشيخ بدر",
    '55': "السقيلبية",
    '56': "تدمر",
    '57': "تل أبيض",
    '58': "تلدو",
    '59': "تلكلخ",
    '60': "التل",
    '61': "الثورة",
    '62': "يبرود",
    '63': "الزبداني"
}

export const SYRIANCITYlIST: ListItem[] = 
  GetReactPaperListItemsListByObject(SYRIANCITY);

// export const SYRIANCITYLIST = 
//     (Object.values(SyrianCity) as SyrianCity[])
//     .map((city, index) => ({id: city, title: SYRIANCITYLOOKUP[city]}));