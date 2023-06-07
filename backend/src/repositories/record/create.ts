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
    let record: Result<Record, Error>;
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

    const recordValue = record.value;

    if (!newRecord) {
      try {
        await storeRecord.read(storeId, recordValue.id, tx);
      } catch {
        await storeRecord.create(
          storeId,
          recordValue.id,
          data.productUrl,
          data.price,
          data.available,
          tx
        );
      }
    }

    const genres = ['All', ...data.genres];
    const genrePromises = genres.map(async (genre) => {
      let dbGenre: Result<GenreType, Error>;
      try {
        dbGenre = await Genre.readByName(genre, tx);
      } catch (err) {
        dbGenre = await Genre.create(genre, tx);
      }

      if (!dbGenre.isOk) {
        throw new Error('Genre operation failed');
      }

      const dbGenreValue = dbGenre.value;

      try {
        await genreRecord.read(dbGenreValue.id, recordValue.id, tx);
      } catch (e) {
        try {
          await genreRecord.create(dbGenreValue.id, recordValue.id, tx);
        } catch (err) {
          console.log(err);
        }
      }
    });

    await Promise.all(genrePromises);

    return Result.ok(recordValue);
  });
};

export default create;
