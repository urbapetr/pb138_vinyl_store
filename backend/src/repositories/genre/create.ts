import type { Genre } from '.prisma/client';
import { Result } from '@badrap/result';
import { DbResult, PrismaTransactionHandle, genericError } from '../types';

const create = async (
  name: string,
  tx: PrismaTransactionHandle
): DbResult<Genre> => {
  try {
    const genre = await tx.genre.create({
      data: { name },
    });

    return Result.ok(genre);
  } catch (e) {
    return genericError;
  }
};

export default create;
