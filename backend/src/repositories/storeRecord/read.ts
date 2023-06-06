import { Result } from '@badrap/result';
import type { StoreInRecord } from '@prisma/client';
import type { PrismaTransactionHandle, DbResult } from '../types';
import { NonexistentRecordError } from '../errors';

const read = async (
  storeId: string,
  recordId: string,
  tx: PrismaTransactionHandle
): DbResult<StoreInRecord> => {
  const storeRecord = await tx.storeInRecord.findUnique({
    where: {
      storeId_recordId: {
        storeId,
        recordId,
      },
    },
  });

  if (!storeRecord) {
    throw new NonexistentRecordError();
  }

  return Result.ok(storeRecord);
};

export default read;
