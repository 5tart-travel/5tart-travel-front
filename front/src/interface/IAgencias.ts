import { ReactNode } from "react";


export interface IAgencias {
   
  agencia_name: any;
  phone: ReactNode;
  oferta: any;
  id: string;
  name_agency: string;
  mail: string;
  password: string;
  address: string;
  imgUrl: string;
  description: string;
  lat: number;
  lon: number;
  display_name: string;
  touristPoints: TouristPoint[];
}

  export interface TouristPoint {
    name: string;
    lat: number;
    lon: number;
    display_name?: string;
  }
  

// export interface IAgencias {
//    id: string,
//     name_agency: string,
//     mail: string,
//     password: string,
//     address: string,
//     imgUrl: string 
    
   
// }

export interface IParams {
    id: string;

}