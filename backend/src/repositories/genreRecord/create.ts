import { Result } from '@badrap/result';
import type { GenreInRecord } from '@prisma/client';
import { DbResult, PrismaTransactionHandle, genericError } from '../types';

const create = async (
  genreId: number,
  recordId: number,
  tx: PrismaTransactionHandle
): DbResult<GenreInRecord> => {
  try {
    const genreRecord = await tx.genreInRecord.create({
      data: {
        genreId,
        recordId,
      },
    });

    return Result.ok(genreRecord);
  } catch (e) {
    return genericError;
  }
};

export default create;
