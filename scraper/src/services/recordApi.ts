import type { Record } from '../models/recordTypes';
import type { ResponseSingle } from '../models/responseTypes';
import axiosInstance from './base';

export const putRecord = async (
  data: Record
): Promise<ResponseSingle<Record>> => {
  const response = await axiosInstance.post('record', data);
  return response.data;
};

export default putRecord;
