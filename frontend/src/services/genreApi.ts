import { Genre } from '../models/genreTypes';
import { ResponseMulti } from '../models/responseTypes';
import axiosInstance from './base';

export const getGenres = async (
  page: number
): Promise<ResponseMulti<Genre>> => {
  const response = await axiosInstance.get(`genre?page=${page}`);
  return response.data;
};
