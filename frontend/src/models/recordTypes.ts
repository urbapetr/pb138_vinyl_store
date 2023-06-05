import { Store } from './storeTypes';

export interface Record {
  id: string;
  title: string;
  artist: string;
  genres: string[];
  cover: string;
}

export interface RecordCheapest extends Record {
  price: number | null;
  priceUrl: string | null | undefined;
}

export interface RecordFull extends Record {
  stores: Store[];
}
