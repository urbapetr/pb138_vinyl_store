import { boolean, number, object, string } from 'yup';

export const recordSchema = object().shape({
  page: number().min(1),
  genre: string(),
  minPrice: number(),
  maxPrice: number(),
  available: boolean(),
  title: string(),
  artist: string(),
  needle: string(),
  orderby: string(),
});

export default recordSchema;
