import { Genre } from '../models/genreTypes';
import { ResponseMulti } from '../models/responseTypes';
// import axiosInstance from './base';
import genres from '../assets/genres.json';

export const getAll = async (): Promise<ResponseMulti<Genre>> => {
  // const response = await axiosInstance.get('genres');
  // return response.data;
  return genres as any;
};
