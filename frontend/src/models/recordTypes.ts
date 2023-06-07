import { MinimalStore, Store } from './storeTypes';

export interface RecordBase {
  id: string;
  title: string;
  artist: string;
  genres: {
    genre: {
      name: string;
    };
  }[];
  imageUrl: string;
}

export interface Record extends RecordBase {
  stores: MinimalStore[];
}

export interface RecordFull extends RecordBase {
  stores: Store[];
}
