export interface Record {
  title: string;
  artist: string;
  genre: string;
}

export interface RecordData {
  artist: string;
  title: string;
  available: boolean;
  price: number;
  productUrl: string;
  image: string;
  genres: string[];
}

export type RecordFilters = {
  genre?: string;
  lowPrice?: number;
  highPrice?: number;
  available?: boolean;
  title?: string;
  artist?: string;
  needle?: string;
  orderby?: string;
};

export type RecordResponse = {
  genres: {
    genre: {
      name: string;
    };
  }[];
  stores: {
    price: number;
    available: boolean;
    productUrl: string;
    store: {
      id: string;
      imageUrl: string | null;
      name: string;
      url: string | null;
    };
  }[];
};

export type RecordPageResponse = {
  genres: {
    genre: {
      name: string;
    };
  }[];
  stores: {
    price: number;
    available: boolean;
    productUrl: string;
  }[];
};
