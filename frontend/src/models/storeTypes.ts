export interface MinimalStore {
  price: number;
  available: boolean;
  productUrl: string;
}

export interface Store extends MinimalStore {
  id: number;
  name: string;
  link: string;
  logo: string;
}
