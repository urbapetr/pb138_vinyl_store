import { Result } from '@badrap/result';
import type { GenreInRecord } from '@prisma/client';
import type { DbResult, PrismaTransactionHandle } from '../types';

const create = async (
  genreId: string,
  recordId: string,
  tx: PrismaTransactionHandle
): DbResult<GenreInRecord> => {
  const genreRecord = await tx.genreInRecord.create({
    data: {
      genreId,
      recordId,
    },
  });

  return Result.ok(genreRecord);
};

export default create;
