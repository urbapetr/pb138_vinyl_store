import { array, boolean, number, object, string } from 'yup';

export const idScheme = object({
  id: string().required('Property [id] is missing'),
});

export const newRecordScheme = object({
  artist: string().required('Property [artist] is missing'),
  title: string().required('Propery [title] is missing'),
  available: boolean().required('Property [available] is missing'),
  price: number().required('Property [price] is missing'),
  image: string().required('Property [image] is missing'),
  genres: array().of(string()).required('Property [genres] is missing'),
  storeId: string().required('Property [storeId] is missing'),
});

export default idScheme;
