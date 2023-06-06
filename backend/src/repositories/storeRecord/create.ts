import type { StoreInRecord } from '@prisma/client';
import { Result } from '@badrap/result';
import { DbResult, PrismaTransactionHandle, genericError } from '../types';

const create = async (
  storeId: string,
  recordId: string,
  available: boolean,
  price: number,
  tx: PrismaTransactionHandle
): DbResult<StoreInRecord> => {
  try {
    const storeRecord = await tx.storeInRecord.create({
      data: {
        storeId,
        recordId,
        available,
        price,
      },
    });

    return Result.ok(storeRecord);
  } catch (e) {
    return genericError;
  }
};

export default create;
