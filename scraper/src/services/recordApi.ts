import type { Record } from '../models/recordTypes';
import type { ResponseSingle } from '../models/responseTypes';
import axiosInstance from './base';

export const putRecord = async (
  data: Record
): Promise<ResponseSingle<Record>> => {
  const response = await axiosInstance.post('records', data);
  return response.data;
};

export default putRecord;
