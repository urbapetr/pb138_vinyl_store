export interface Genre {
  id: string;
  name: string;
  records: {
    record: {
      imageUrl: string;
    };
  }[];
}
