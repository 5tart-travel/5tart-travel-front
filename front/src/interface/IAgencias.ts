

export interface IAgencias {
    id?: string;
    name: string;
    zona: string;
    imgUrl: string;
    description: string;
    location: string;
    agencia_name?:string;
    email?: string;
    phone?: number;
    pets?: string;
}

export interface IParams {
    id: string;

}