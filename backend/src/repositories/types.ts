import { Result } from '@badrap/result';
import type { Prisma, PrismaClient } from '@prisma/client';

export type PrismaTransactionHandle = Omit<
  PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

export const genericError = Result.err(
  new Error('Sorry. Some error has occured.')
);

export type DbResult<T> = Promise<Result<T>>;
