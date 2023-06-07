export interface MinimalStore {
  price: number;
  available: boolean;
  productUrl: string;
}

export interface Store extends MinimalStore {
  store: {
    id: string;
    imageUrl: string;
    name: string;
    url: string;
  };
}
