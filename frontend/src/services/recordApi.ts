import { Record, RecordFull, ResponseMulti, ResponseSingle } from '../models';
import axiosInstance from './base';

export const getRecords = async (
  query: string
): Promise<ResponseMulti<Record>> => {
  const response = await axiosInstance.get(`record?${query}`);
  return response.data;
};

export const getOne = async (
  recordId: string
): Promise<ResponseSingle<RecordFull>> => {
  const response = await axiosInstance.get(`record/${recordId}`);
  return response.data;
};
