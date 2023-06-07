import { Result } from '@badrap/result';
import type { Genre as GenreType, Record } from '@prisma/client';
import type { RecordData } from '../../types/record';
import { DbResult, genericError } from '../types';
import client from '../client';
import Genre from '../genre';
import { readByProduct } from './read';
import genreRecord from '../genreRecord';
import storeRecord from '../storeRecord';

const create = async (data: RecordData, storeId: string): DbResult<Record> => {
  return client.$transaction(async (tx) => {
    let record: Result<Record>;
    let newRecord = false;

    try {
      record = await readByProduct(data.title, data.artist, tx);
    } catch (e) {
      const recordData = await tx.record.create({
        data: {
          artist: data.artist,
          title: data.title,
          imageUrl: data.image,
          stores: {
            create: {
              available: data.available,
              price: data.price,
              productUrl: data.productUrl,
              store: {
                connect: {
                  id: storeId,
                },
              },
            },
          },
        },
      });

      record = Result.ok(recordData);
      newRecord = true;
    }

    if (!record.isOk) {
      return genericError;
    }

    if (!newRecord) {
      try {
        await storeRecord.read(storeId, record.value.id, tx);
      } catch {
        await storeRecord.create(
          storeId,
          record.value.id,
          data.productUrl,
          data.price,
          data.available,
          tx
        );
      }
    }

    // Yup, javascript is a gay language
    // eslint-disable-next-line no-restricted-syntax
    for (const genre of ['All', ...data.genres]) {
      // eslint-disable-next-line no-await-in-loop
    let dbGenre: Result<GenreType>;
      try {
        dbGenre = await Genre.readByName(genre, tx);
      } catch (e) {
        dbGenre = await Genre.create(genre, tx);
      }

      if (!dbGenre.isOk) {
        return genericError;
      }

      try {
        // eslint-disable-next-line no-await-in-loop
        await genreRecord.read(dbGenre.value.id, record.value.id, tx);
      } catch (e) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await genreRecord.create(dbGenre.value.id, record.value.id, tx);
        }
        catch (e) {
          // suppress the exception that can occur if a record is created twice
          console.log(e);
        }
      }
    }

    return record;
  });
};

export default create;
