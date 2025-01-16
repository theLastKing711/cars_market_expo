import { ListData } from "../shared";

export enum SyrianCity {
    Aleppo = 1,

    Damascus,

    Homs,

    Hammah,

    Latakia,

    Raqqa,

    DierElZor,

    AlHasaka,

    Qamishli,

    Tartus,

    Douma,

    AlSuwayda,

    Quneitra,

    AlbuKamal,

    Afrin,

    AlAtarib,

    Azaz,

    AlBab,

    Baniyas,

    Darayya,

    Duraykish,

    Fiq,

    AlHaffah,

    Izra,

    Jableh,

    Jarabulus,

    JisrAlShughur,

    MaaratAlNuman,

    AlMalikiyah,

    Manbij,

    Masyaf,

    Mayadin,

    Mhardeh,

    AlMukharram,

    Qardaha,

    Qatana,

    Qudsaya,

    AlQusayer,

    AlQutayfah,

    RasAlAyn,

    AlRastan,

    AlSafira,

    Safita,

    Salamiyah,

    Salkhad,

    AlSanamayn,

    Salqin,

    AlShaykhBadr,

    AlSuqaylabiyah,

    Tadmur,

    TellAbyad,

    Taldou,

    Talalakh,

    AlTall,

    AlThawrah,

    Yabroud,

    Zabadani,

    Daraa,

    Idleb,

    Ariha,

    DayrHafir,

    AlNabk,

    AynAlArab,
}


const syrianCityLookup: Record<SyrianCity, string> = {
    [SyrianCity.Aleppo]: "حلب",
    [SyrianCity.Damascus]: "دمشق",
    [SyrianCity.Homs]: "حمص",
    [SyrianCity.Hammah]: "حماة",
    [SyrianCity.Latakia]: "اللاذقية",
    [SyrianCity.Raqqa]: "الرقة",
    [SyrianCity.DierElZor]: "دير الزور",
    [SyrianCity.AlHasaka]: "الحسكة",
    [SyrianCity.Qamishli]: "القامشلي",
    [SyrianCity.Tartus]: "طرطوس",
    [SyrianCity.Douma]: "دوما",
    [SyrianCity.Idleb]: "إدلب",
    [SyrianCity.Daraa]: "درعا",
    [SyrianCity.AlSuwayda]: "السويداء",
    [SyrianCity.Quneitra]: "القنيطرة",
    [SyrianCity.AlbuKamal]: "البوكمال",
    [SyrianCity.Afrin]: "عفرين",
    [SyrianCity.Ariha]: "أريحا",
    [SyrianCity.AlAtarib]: "اﻷتارب",
    [SyrianCity.AynAlArab]: "عين العرب",
    [SyrianCity.Azaz]: "عزاز",
    [SyrianCity.AlBab]: "الباب",
    [SyrianCity.Baniyas]: "بانياس",
    [SyrianCity.Darayya]: "داريا",
    [SyrianCity.DayrHafir]: "دير حافر",
    [SyrianCity.Duraykish]: "دريكيش",
    [SyrianCity.Fiq]: "فيق",
    [SyrianCity.AlHaffah]: "الهفا",
    [SyrianCity.Izra]: "أزرع",
    [SyrianCity.Jableh]: "جبلة",
    [SyrianCity.Jarabulus]: "جرابلس",
    [SyrianCity.JisrAlShughur]: "جسر الشغور",
    [SyrianCity.MaaratAlNuman]: "معرة النعمان",
    [SyrianCity.AlMalikiyah]: "المالكية",
    [SyrianCity.Manbij]: "منبج",
    [SyrianCity.Masyaf]: "مصياف",
    [SyrianCity.Mayadin]: "الميادين",
    [SyrianCity.Mhardeh]: "مجردة",
    [SyrianCity.AlMukharram]: "المخرم",
    [SyrianCity.AlNabk]: "النبك",
    [SyrianCity.Qardaha]: "القرداحة",
    [SyrianCity.Qatana]: "قطنا",
    [SyrianCity.Qudsaya]: "قدسيا",
    [SyrianCity.AlQusayer]: "القصير",
    [SyrianCity.AlQutayfah]: "القطيقة",
    [SyrianCity.RasAlAyn]: "رأس العين",
    [SyrianCity.AlRastan]: "الرستن",
    [SyrianCity.AlSafira]: "السفيرة",
    [SyrianCity.Safita]: "صافيتا",
    [SyrianCity.Salamiyah]: "سلمية",
    [SyrianCity.Salkhad]: "صلخد",
    [SyrianCity.AlSanamayn]: "الصنمين",
    [SyrianCity.Salqin]: "سلقين",
    [SyrianCity.AlShaykhBadr]: "الشيخ بدر",
    [SyrianCity.AlSuqaylabiyah]: "السقيلبية",
    [SyrianCity.Tadmur]: "تدمر",
    [SyrianCity.TellAbyad]: "تل أبيض",
    [SyrianCity.Taldou]: "تلدو",
    [SyrianCity.Talalakh]: "تلكلخ",
    [SyrianCity.AlTall]: "التل",
    [SyrianCity.AlThawrah]: "الثورة",
    [SyrianCity.Yabroud]: "يبرود",
    [SyrianCity.Zabadani]: "الزبداني"
};

export const syrianCitiesList = 
    (Object.values(SyrianCity) as SyrianCity[])
    .map((city, index) => ({id: city, title: syrianCityLookup[city]}));