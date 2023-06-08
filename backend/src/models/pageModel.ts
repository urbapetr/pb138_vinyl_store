import { number, object } from 'yup';

export const pageSchema = object().shape({
  page: number().min(1),
});

export default pageSchema;
