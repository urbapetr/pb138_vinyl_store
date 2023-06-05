import type { Request, Response } from 'express';
import type { ApiResponse } from '../types';
import readGenrePage from '../../repositories/genre/read';

export const readGenres = async (req: Request, res: Response) => {
  // set default page to 1
  let page = 1;

  // if page is specified in query, use it
  if (typeof req.query.page === 'string') {
    page = parseInt(req.query.page, 10);
  }

  // if page is not a number or is less than 1, set it to 1
  if (Number.isNaN(page) || page < 1) {
    return res.status(400);
  }

  // get 10 records from database according to page, including imageUrl of the first record in each genre
  const genresWithRecordImage = await readGenrePage(page);

  const response: ApiResponse<{}> = {
    status: 'success',
    data: genresWithRecordImage,
    message: `Listed ${genresWithRecordImage.length} genres.`,
  };

  return res.status(200).send(response);
};

export default readGenres;
