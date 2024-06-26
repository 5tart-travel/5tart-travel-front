export interface ITour {
  id: string;
  title: string;
  price: number;
  description: string;
  imgUrl: string;
  address: string;
  country: string | null;
  region: string | null;
  state: string | null;
  date: string;
  agency: {
    id: string;
    name_agency: string;
    mail: string;
    password: string;
    confirm_password: string;
    address: string;
    imgUrl: string;
  };
}
