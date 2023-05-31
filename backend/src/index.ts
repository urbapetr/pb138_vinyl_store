import express from 'express';
import cors from 'cors';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import { PrismaClient } from '@prisma/client';
import type { ApiResponse } from './controllers/types';

configEnvVariables();
const app = express();
const port = env.PORT ?? 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();

app.use('/', async (_req, res) => {
  const random = Math.random() * 100;

  const newRecord = await prisma.record.create({
    data: {
      title: `Record ${random}`,
      artist: `Artist ${random}`,
      genre: `Genre ${random}`,
    },
  });

  await prisma.store.create({
    data: {
      name: `Store ${random}`,
      records: {
        create: {
          recordId: newRecord.id,
          copies: Math.floor(Math.random() * 10) + 1,
          available: Math.random() < 0.5,
          price: Math.random() * 100,
        },
      },
    },
  });

  await prisma.store.create({
    data: {
      name: `Store ${random + 1}`,
      records: {
        create: {
          recordId: newRecord.id,
          copies: Math.floor(Math.random() * 10) + 1,
          available: Math.random() < 0.5,
          price: Math.random() * 100,
        },
      },
    },
  });

  const allUsers = await prisma.record.findMany();

  const response: ApiResponse<{}> = {
    status: 'success',
    data: {},
    message: allUsers.toString(),
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
