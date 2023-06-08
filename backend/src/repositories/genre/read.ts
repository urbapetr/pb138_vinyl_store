import type { Genre } from '@prisma/client';
import { Result } from '@badrap/result';
import client from '../client';
import { DeletedRecordError, NonexistentRecordError } from '../errors';
import type { DbResult, PrismaTransactionHandle } from '../types';
import { PAGE_ITEMS_COUNT } from '../consts';

export const readByName = async (
  name: string,
  tx: PrismaTransactionHandle
): DbResult<Genre> => {
  const genre = await tx.genre.findUnique({
    where: { name },
  });

  if (!genre) {
    throw new NonexistentRecordError('The specified genre doesn not exist!');
  }

  if (genre.deletedAt) {
    throw new DeletedRecordError('The specified genre has been deleted!');
  }

  return Result.ok(genre);
};

export const readById = async (
  id: string,
  tx: PrismaTransactionHandle
): DbResult<Genre> => {
  const genre = await tx.genre.findUnique({
    where: { id },
  });

  if (!genre) {
    throw new NonexistentRecordError('The specified genre doesn not exist!');
  }

  if (genre.deletedAt) {
    throw new DeletedRecordError('The specified genre has been deleted!');
  }

  return Result.ok(genre);
};

export const readPage = async (page: number): DbResult<Genre[]> => {
  let genres = await client.genre.findMany({
    skip: (page - 1) * PAGE_ITEMS_COUNT,
    take: PAGE_ITEMS_COUNT,
    include: {
      records: {
        include: {
          record: {
            select: {
              imageUrl: true,
            },
          },
        },
        take: 1,
        orderBy: {
          record: {
            createdAt: 'desc',
          },
        },
      },
    },
    orderBy: {
      records: {
        _count: 'desc',
      },
    },
  });

  // Remove empty genres
  genres = genres.filter((genre) => genre.records.length > 0);

  return Result.ok(genres);
};
