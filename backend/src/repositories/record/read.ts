import { Result } from '@badrap/result';
import client from '../client';
import { PAGE_ITEMS_COUNT } from '../consts';
import type { PrismaTransactionHandle } from '../types';
import { NonexistentRecordError } from '../errors';

export const readByProduct = async (
  title: string,
  artist: string,
  tx: PrismaTransactionHandle
) => {
  const record = await tx.record.findFirst({
    where: {
      artist,
      title,
    },
  });

  if (!record) {
    throw new NonexistentRecordError('The specified record does not exist!');
  }

  return Result.ok(record);
};

export const readById = async (id: string) => {
  const record = await client.record.findUnique({
    where: {
      id,
    },
    include: {
      genres: {
        select: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      },
      stores: {
        select: {
          price: true,
          available: true,
        },
      },
    },
  });

  if (!record) {
    throw new NonexistentRecordError('The specified record does not exist!');
  }

  return Result.ok(record);
};

export const readPage = async (page: number) => {
  const records = await client.record.findMany({
    skip: (page - 1) * PAGE_ITEMS_COUNT,
    take: PAGE_ITEMS_COUNT,
    include: {
      stores: {
        take: 1,
        select: {
          price: true,
          available: true,
        },
        orderBy: {
          price: 'desc',
        },
        where: {
          available: true,
        },
      },
      genres: {
        select: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return Result.ok(records);
};
