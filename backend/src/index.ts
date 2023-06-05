import express, {Response} from 'express';
import cors from 'cors';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import type { ApiResponse } from './controllers/types';
import type {MusicGenreList} from "./types/genre";
import readGenrePage from "./repositories/genre/read";

configEnvVariables();
const app = express();
const port = env.PORT ?? 3000;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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
