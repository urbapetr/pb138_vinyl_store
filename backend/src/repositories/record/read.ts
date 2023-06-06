import { Result } from '@badrap/result';
import type { Prisma } from '@prisma/client';
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

const insensitiveMode = 'insensitive';

export const readPage = async (page: number, filters: any) => {
  const whereCondition: Prisma.RecordWhereInput = {};

  if (filters.genre) {
    whereCondition.genres = {
      some: {
        genre: {
          name: filters.genre,
        },
      },
    };
  }

  if (filters.lowPrice) {
    whereCondition.stores = {
      some: {
        price: {
          gte: Number(filters.lowPrice),
        },
      },
    };
  }

  if (filters.highPrice) {
    whereCondition.stores = {
      some: {
        price: {
          lte: Number(filters.highPrice),
        },
      },
    };
  }

  if (filters.available) {
    whereCondition.stores = {
      some: {
        available: filters.available === 'true',
      },
    };
  }

  if (filters.title) {
    whereCondition.title = {
      contains: filters.title,
      mode: insensitiveMode,
    };
  }

  if (filters.artist) {
    whereCondition.artist = {
      contains: filters.artist,
      mode: insensitiveMode,
    };
  }

  if (filters.needle) {
    whereCondition.OR = [
      {
        title: {
          contains: filters.needle,
          mode: insensitiveMode,
        },
      },
      {
        artist: {
          contains: filters.needle,
          mode: insensitiveMode,
        },
      },
    ];
  }

  let orderBy: Prisma.RecordOrderByWithRelationInput = {};

  if (filters.orderby) {
    const [column, direction] = filters.orderby.split('_');
    orderBy = { [column]: direction };
  }

  const records = await client.record.findMany({
    skip: (page - 1) * PAGE_ITEMS_COUNT,
    take: PAGE_ITEMS_COUNT,
    where: whereCondition,
    orderBy,
    include: {
      stores: {
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
