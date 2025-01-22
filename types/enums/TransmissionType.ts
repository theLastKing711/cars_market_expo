export enum TransmissionType {

    Automatic = 1,
    Manual,

}
export const TRANSMISSIONTYPELOOKUP: Record<TransmissionType, string> = {
    [TransmissionType. Automatic]: 'أتوماتيك',
    [TransmissionType.Manual]: 'عادي',
}

