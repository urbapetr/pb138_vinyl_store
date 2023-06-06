import { object, string } from 'yup';

export const idScheme = object({
  id: string().required('Property [id] is missing'),
});

export default idScheme;
