import type { Genre } from '.prisma/client';
import { Result } from '@badrap/result';
import type { DbResult, PrismaTransactionHandle } from '../types';

const create = async (
  name: string,
  tx: PrismaTransactionHandle
): DbResult<Genre> => {
  const genre = await tx.genre.create({
    data: { name },
  });

  return Result.ok(genre);
};

export default create;
