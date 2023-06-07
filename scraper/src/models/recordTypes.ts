export interface Record {
  artist: string;
  title: string;
  available: boolean;
  price: number;
  image: string;
  genres: string[];
  productUrl: string;
}

export interface RecordSend extends Record {
  storeId: string;
}

export default Record;
