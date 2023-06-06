import type { Request, Response } from 'express';
import type { ApiResponse } from '../types';
import genre from '../../repositories/genre';

export const readGenres = async (req: Request, res: Response) => {
  try {
    // set default page to 1
    let page = 1;

    // if page is specified in query, use it
    if (typeof req.query.page === 'string') {
      page = parseInt(req.query.page, 10);
    }

    // if page is not a number or is less than 1, set it to 1
    if (Number.isNaN(page) || page < 1) {
      return res.status(400).send({ error: 'Page must be more than 0.' });
    }

    // get 10 records from database according to page, including imageUrl of the first record in each genre
    const genresWithRecordImage = await genre.readPage(page);

    if (!genresWithRecordImage.isOk) {
      return res.status(500).send({ error: 'Something went wrong' });
    }

    const response: ApiResponse<{}> = {
      status: 'success',
      data: genresWithRecordImage.value,
      message: `Listed ${genresWithRecordImage.value.length} genres.`,
    };

    return res.status(200).send(response);
  } catch (e) {
    return res.status(500).send({ error: 'Something went wrong' });
  }
};

export default readGenres;
