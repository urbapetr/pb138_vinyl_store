import { Result } from '@badrap/result';
import type { GenreInRecord } from '@prisma/client';
import { type PrismaTransactionHandle, genericError, DbResult } from '../types';
import { NonexistentRecordError } from '../errors';

const read = async (
  genreId: number,
  recordId: number,
  tx: PrismaTransactionHandle
): DbResult<GenreInRecord> => {
  try {
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
  } catch (e) {
    return genericError;
  }
};

export default read;
