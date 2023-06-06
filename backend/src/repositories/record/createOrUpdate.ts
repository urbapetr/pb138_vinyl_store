import type { RecordData } from '../../types/record';

export async function createOrUpdateRecord(data: RecordData, storeId: number) {
  // Get existing records by artist and title
  let record = await prisma.record.findFirst({
    where: {
      artist: data.artist,
      title: data.title,
    },
  });

  // Go through the passed genres and create them if they do not already exist
  const genres = [];
  for (let i = 0; i < data.genres.length; i++) {
    const currentGenre = data.genres[i];
    if (currentGenre !== undefined) {
      let genre = prisma.genre.findUnique({
        where: { name: currentGenre },
      });
      if (!genre) {
        genre = prisma.genre.create({
          data: { name: currentGenre },
        });
      }
      genres.push(genre);
    }
  }

  // Add the genre with id 1 (specific genre - 'all') to the genres list
  const defaultGenre = await prisma.genre.findUnique({ where: { id: 1 } });
  if (!defaultGenre) {
    throw new Error('Default genre with id 1 does not exist.');
  }
  genres.push(defaultGenre);

  if (genres.length === 0) {
    throw new Error('At least one genre is required to create a record.');
  }

  // If the record does not exist, create a new one
  if (!record) {
    record = await prisma.record.create({
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

    // Assign all the genres to the newly created record
    genres.forEach((genre) => {
      prisma.genreInRecord.create({
        data: {
          recordId: record.id,
          genreId: genre.id,
        },
      });
    });
  } else {
    // If the record exists, add a store and new genres to it
    await prisma.storeInRecord.create({
      data: {
        storeId,
        recordId: record.id,
        available: data.available,
        price: data.price,
      },
    });

    // Add new genres that are not yet assigned to the record
    for (const genre of genres) {
      const existingGenreInRecord = await prisma.genreInRecord.findUnique({
        where: {
          genreId_recordId: {
            genreId: genre.id,
            recordId: record.id,
          },
        },
      });
      if (!existingGenreInRecord) {
        await prisma.genreInRecord.create({
          data: {
            recordId: record.id,
            genreId: genre.id,
          },
        });
      }
    }
  }
}

export default createOrUpdateRecord;
