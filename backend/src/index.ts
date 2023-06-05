import express, {Response} from 'express';
import cors from 'cors';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import type { ApiResponse } from './controllers/types';
import type {MusicGenreList} from "./types/genre";
import readGenrePage from "./repositories/genre/read";
import {PrismaClient} from "@prisma/client";

configEnvVariables();
const app = express();
const port = env.PORT ?? 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

// todo for test, remove then
app.get('/create-record-test', async (_req, res): Promise<Response<{}>> => {
    await prisma.record.create({
    data: {
      artist: 'Artist 1',
      title: 'Title 1',
      imageUrl: 'http://image1.com',
      stores: {
        create: [
          {
            storeId: 1,
            available: true,
            price: 9.99,
          },
          {
            storeId: 2,
            available: false,
            price: 14.99,
          },
        ],
      },
      genres: {
        create: [
          {
            genreId: 30
          },
          {
            genreId: 51
          }
        ]
      }
    }
  })

    const response: ApiResponse<{}> = {
        status: 'success',
        data: {},
        message: 'Test successful',
    };

    return res.status(200).send(response);
});

app.get('/genre', async (_req, res): Promise<Response<MusicGenreList>>  => {
  // set default page to 1
  let page = 1;

  // if page is specified in query, use it
  if (typeof _req.query.page === 'string')
  {
    page = parseInt(_req.query.page);
  }

  // if page is not a number or is less than 1, set it to 1
  if (isNaN(page) || page < 1)
  {
    page = 1;
  }

  // get 10 records from database according to page, including imageUrl of the first record in each genre
  const genresWithRecordImage = await readGenrePage(page);

  const response: ApiResponse<{}> = {
    status: 'success',
    data: genresWithRecordImage,
    message: 'Listed ' + genresWithRecordImage.length + ' genres.',
  };

  return res.status(200).send(response);
});

app.use((_req, res) => {
  const response: ApiResponse<{}> = {
    status: 'failure',
    data: {},
    error: 'No matching endpoint was found.',
  };

  return res.status(404).send(response);
});

if (env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(
      `[${new Date().toISOString()}] RESTful API is listening on port ${port}`,
    );
  });
}

export default app;
