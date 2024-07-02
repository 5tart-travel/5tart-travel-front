export interface ISearch {
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
  touristPoints: { lat: number; lon: number; name: string; }[];
  agency: {
    id: string;
    name_agency: string;
    mail: string;
    password: string;
    address: string;
    imgUrl: string;
  };
}