export enum FuelType {
    Benzene = '1',
    Diesel =  '2',
    Electricity = '3',
  }
  

 export function getFuelType(fuelType: FuelType) {
    switch (fuelType)  {
        case FuelType.Benzene:
            return 'بنزين';
            break;

        case FuelType.Diesel:
            return 'ديزل';
            break;
    
        case FuelType.Electricity:
            return 'كهرباء'
            break
        
        default:
            break;
    }
  }