import { Genre } from '../models/genreTypes';
import { ResponseMulti } from '../models/responseTypes';
import axiosInstance from './base';

export const getAll = async (): Promise<ResponseMulti<Genre>> => {
  const response = await axiosInstance.get('genre');
  return response.data;
};
