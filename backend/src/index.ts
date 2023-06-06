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
