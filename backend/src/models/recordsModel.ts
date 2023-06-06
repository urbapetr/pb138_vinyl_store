import { boolean, number, object, string } from 'yup';

const recordsSchema = object().shape({
  genre: string(),
  lowPrice: number(),
  highPrice: number(),
  available: boolean(),
  title: string(),
  artist: string(),
  needle: string(),
  orderby: string(),
});

export default recordsSchema;
