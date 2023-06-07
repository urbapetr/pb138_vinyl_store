import { MinimalStore } from './storeTypes';

export interface Record {
  id: string;
  title: string;
  artist: string;
  genres: {
    name: string;
  }[];
  cover: string;
  stores: MinimalStore[];
}
