import {
  RecordCheapest,
  RecordFull,
  ResponseMulti,
  ResponseSingle,
} from '../models';
import records from '../assets/records.json';
import record1 from '../assets/single-record.json';
import record2 from '../assets/single-record2.json';

export const getRecords = async (): Promise<ResponseMulti<RecordCheapest>> => {
  // const response = await axiosInstance.get('genres/');
  // return response.data;
  return records as any;
};

export const getOne = async (
  recordId: string
): Promise<ResponseSingle<RecordFull>> => {
  // const response = await axiosInstance.get(`records/$recordId`);
  // return response.data;
  return record1 as any;
};
