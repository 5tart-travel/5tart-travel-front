export interface IPlaneTour {
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
    hotel:string;
    empresa:string;
    agency:any;
  }