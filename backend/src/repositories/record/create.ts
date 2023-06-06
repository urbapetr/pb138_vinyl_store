import { Result } from '@badrap/result';
import type { Record } from '@prisma/client';
import type { RecordData } from '../../types/record';
import { DbResult, genericError } from '../types';
import client from '../client';
import Genre from '../genre';
import { readByProduct } from './read';
import genreRecord from '../genreRecord';

const create = async (data: RecordData, storeId: number): DbResult<Record> => {
  try {
    return await client.$transaction(async (tx) => {
      let record = await readByProduct(data.title, data.artist, tx);

      if (record.isErr) {
        const newRecord = await client.record.create({
          data: {
            artist: data.artist,
            title: data.title,
            imageUrl: data.image,
            stores: {
              create: {
                storeId,
                available: data.available,
                price: data.price,
              },
            },
          },
        });

        record = Result.ok(newRecord);
      }

      if (!record.isOk) {
        return genericError;
      }

      data.genres.forEach(async (genre) => {
        let dbGenre = await Genre.readByName(genre, tx);

        if (dbGenre.isErr) {
          dbGenre = await Genre.create(genre, tx);
        }

        if (dbGenre.isOk && record.isOk) {
          genreRecord.create(dbGenre.value.id, record.value.id, tx);
        }
      });

      return record;
    });
  } catch (e) {
    return genericError;
  }
};

export default create;
