import { Result } from '@badrap/result';
import type { StoreInRecord } from '@prisma/client';
import type { DbResult, PrismaTransactionHandle } from '../types';

const create = async (
  storeId: string,
  recordId: string,
  productUrl: string,
  price: number,
  available: boolean,
  tx: PrismaTransactionHandle
): DbResult<StoreInRecord> => {
  const storeRecord = await tx.storeInRecord.create({
    data: {
      storeId,
      recordId,
      price,
      productUrl,
      available,
    },
  });

  return Result.ok(storeRecord);
};

export default create;
