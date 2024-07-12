export interface ICreateTourDto {
  title: string;
  price: number | null;
  description: string | null;
  imgUrl?: string | null;
  address: string | null;
  fecha_ingreso: Date | null;
  fecha_egreso: Date | null;
  destino?: string | null;
  salida?: string | null;
  oferta?: boolean | null;
  transportType: string | '' | null;
  hotel?: string | null;
  empresa?: string | null;
  region?: string;
}
