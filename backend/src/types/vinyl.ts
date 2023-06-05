interface Vinyl {
  title: string;
  artist: string;
  genres: string[];
  available: boolean;
  quantity?: number;
  price: number;
  image: string | undefined;
}

export default Vinyl;
