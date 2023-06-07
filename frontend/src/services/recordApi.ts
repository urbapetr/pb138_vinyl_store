import { Record, ResponseMulti, ResponseSingle } from '../models';
import record1 from '../assets/single-record.json';
import record2 from '../assets/single-record2.json';
import axiosInstance from './base';

export const getRecords = async (
  query: string
): Promise<ResponseMulti<Record>> => {
  const response = await axiosInstance.get(`record?${query}`);
  console.log(response.data);
  return response.data;
};

export const getOne = async (
  recordId: string
): Promise<ResponseSingle<Record>> => {
  // const response = await axiosInstance.get(`records/$recordId`);
  // return response.data;
  return record1 as any;
};
