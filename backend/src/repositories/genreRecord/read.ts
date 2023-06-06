import { Result } from '@badrap/result';
import type { GenreInRecord } from '@prisma/client';
import type { PrismaTransactionHandle, DbResult } from '../types';
import { NonexistentRecordError } from '../errors';

const read = async (
  genreId: string,
  recordId: string,
  tx: PrismaTransactionHandle
): DbResult<GenreInRecord> => {
  const genreRecord = await tx.genreInRecord.findUnique({
    where: {
      genreId_recordId: {
        genreId,
        recordId,
      },
    },
  });

  if (!genreRecord) {
    throw new NonexistentRecordError();
  }

  return Result.ok(genreRecord);
};

export default read;
