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
