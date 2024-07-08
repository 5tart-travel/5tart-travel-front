export interface IBusTour {
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
    touristPoints:ITourisPoints[]
    averageRate:number;
    comments:IComments[]
    tourId: string;
    listImg:string[];
    
  }
  export interface ITourisPoints{
    name:string;
    lat:number;
    lon:number;
  }
  export interface IComments{
    id:string
    username:string;
    bad:string
    good:string
    rate:number
  }