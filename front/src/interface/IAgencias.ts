import { ReactNode } from "react";
import { IComments, ITourisPoints } from "./IBusTour";

export interface IAgencias {
  phone: ReactNode;
  oferta: boolean;
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
  tours: IBusTour[];
}

export interface Itour {
  id: string;
  title: string;
  price: number;
  description: string;
  imgUrl: string;
  fecha_ingreso: string;
  fecha_egreso: string;
  lat: number;
  lon: number;
  display_name: string;
  destino: string;
  salida: string;
  address: string;
  country: string;
  region: string;
  state: string;
  date: string;
  transportType: string;
  oferta: boolean;
  hotel: string;
  empresa: string;
  agency: IAgencias;
  touristPoints: ITourisPoints[];
  averageRate: number;
  tours: Omit<IBusTour, 'comments'>[];
}

export interface IBusTour extends Itour {
  comments: never[];
  tourId: string;
  
}

export interface TouristPoint {
  name: string;
  lat: number;
  lon: number;
  display_name?: string;
}

export interface IParams {
  id: string;
}
