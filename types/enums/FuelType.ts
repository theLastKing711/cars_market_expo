export enum FuelType {
    Benzene = 1,
    Diesel =  2,
    Electricity = 3,
  }
  
export const FUELTYPELOOKUP: Record<FuelType, string> = {
    [FuelType.Benzene]: "بنزين",
    [FuelType.Diesel]: "ديزل",
    [FuelType.Electricity]: "كهرباء",
}