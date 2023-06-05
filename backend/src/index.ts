import cors from 'cors';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import express from 'express';
import type { ApiResponse } from './controllers/types';
import indexRouter from './routes/indexRouter';

configEnvVariables();
const app = express();
const port = env.PORT ?? 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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
            genreId: 30,
          },
          {
            genreId: 51,
          },
        ],
      },
    },
  });

  const response: ApiResponse<{}> = {
    status: 'success',
    data: {},
    message: 'Test successful',
  };

  return res.status(200).send(response);
});

app.use('/', indexRouter);

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
      `[${new Date().toISOString()}] RESTful API is listening on port ${port}`
    );
  });
}

export default app;
